import { inject, injectable } from 'tsyringe';

import { IFindCardsByColumnIdRepository } from '@common/providers/LeadloversDB/models/cards/IFindCardsByColumnIdRepository';
import { IUpdateCardRepository } from '@common/providers/LeadloversDB/models/cards/IUpdateCardRepository';
import { IUpdateCardsByColumnIdRepository } from '@common/providers/LeadloversDB/models/cards/IUpdateCardsByColumnIdRepository';
import { IFindFunnelsByListCodiRepository } from '@common/providers/LeadloversDB/models/funnels/IFindFunnelsByListCodiRepository';
import { IInsertPipelineHistoryRepository } from '@common/providers/LeadloversDB/models/history/IInsertPipelineHistoryRepository';
import { IFindLeadsByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/leads/IFindLeadsByUsuaSistCodiRepository';
import { IFindListsByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/lists/IFindListsByUsuaSistCodiRepository';
import { IFindDefaultModelsByFuniCodiRepository } from '@common/providers/LeadloversDB/models/models/IFindDefaultModelsByFuniCodiRepository';
import { IRemoveCardNotificationRepository } from '@common/providers/LeadloversDB/models/notifications/IRemoveCardNotificationRepository';
import { IRemoveCardNotificationsRepository } from '@common/providers/LeadloversDB/models/notifications/IRemoveCardNotificationsRepository';
import { CardStatus } from '@common/shared/enums/CardStatus';
import { LogType } from '@common/shared/enums/LogType';
import { MachineType } from '@common/shared/enums/MachineType';
import { OpportunityStatus } from '@common/shared/enums/OpportunityStatus';
import { LogData } from '@common/shared/types/LogData';
import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';
import { formatLogData } from '@common/utils/formatLogData';
import IOpportunityProvider, {
  Contact,
  FindOpportunityFilter,
  Machine,
  Message,
  Opportunity,
  Sequence
} from '../../models/IOpportunityProvider';

@injectable()
export default class LeadloversOpportunityProvider
  implements IOpportunityProvider
{
  constructor(
    @inject('FindCardsByColumnIdRepository')
    private findCardsByColumnIdRepository: IFindCardsByColumnIdRepository,
    @inject('FindDefaultModelsByFuniCodiRepository')
    private findDefaultModelsByFuniCodiRepository: IFindDefaultModelsByFuniCodiRepository,
    @inject('FindFunnelsByListCodiRepository')
    private findFunnelsByListCodiRepository: IFindFunnelsByListCodiRepository,
    @inject('FindLeadsByUsuaSistCodiRepository')
    private findLeadsByUsuaSistCodiRepository: IFindLeadsByUsuaSistCodiRepository,
    @inject('FindListsByUsuaSistCodiRepository')
    private findListsByUsuaSistCodiRepository: IFindListsByUsuaSistCodiRepository,
    @inject('FindMessengerModelsByFuniCodiRepository')
    private findMessengerModelsByFuniCodiRepository: IFindDefaultModelsByFuniCodiRepository,
    @inject('FindWhatsAppModelsByFuniCodiRepository')
    private findWhatsAppModelsByFuniCodiRepository: IFindDefaultModelsByFuniCodiRepository,
    @inject('InsertPipelineHistoryRepository')
    private insertPipelineHistoryRepository: IInsertPipelineHistoryRepository,
    @inject('RemoveCardNotificationRepository')
    private removeCardNotificationRepository: IRemoveCardNotificationRepository,
    @inject('RemoveCardNotificationsRepository')
    private removeCardNotificationsRepository: IRemoveCardNotificationsRepository,
    @inject('UpdateCardRepository')
    private updateCardRepository: IUpdateCardRepository,
    @inject('UpdateCardsByColumnIdRepository')
    private updateCardsByColumnIdRepository: IUpdateCardsByColumnIdRepository
  ) {}

  public async deleteNotificationByOpportunityId(
    opportunityId: number
  ): Promise<void> {
    await this.removeCardNotificationRepository.remove(opportunityId);
  }

  public async deleteNotificationsByOpportunityIds(
    opportunityIds: number[]
  ): Promise<void> {
    await this.removeCardNotificationsRepository.remove(opportunityIds);
  }

  public async deleteOpportunitiesByStageId(
    stageId: number
  ): Promise<Pick<Opportunity, 'id' | 'name'>[]> {
    const cards = await this.updateCardsByColumnIdRepository.update({
      columnId: stageId,
      status: this.getCardStatus(OpportunityStatus.REMOVED)
    });
    return cards.map(card => {
      return {
        id: card.id,
        name: card.name ?? ''
      };
    });
  }

  public async deleteOpportunity(
    stageId: number,
    opportunityId: number
  ): Promise<void> {
    await this.updateCardRepository.update({
      columnId: stageId,
      cardId: opportunityId,
      status: this.getCardStatus(OpportunityStatus.REMOVED)
    });
  }

  public async findContacts(
    userId: number,
    pagination: Pagination,
    contactName?: string
  ): Promise<ResultPaginated<Contact>> {
    return await this.findLeadsByUsuaSistCodiRepository.list(
      userId,
      pagination,
      contactName
    );
  }

  public async findMachines(
    userId: number,
    pagination: Pagination
  ): Promise<ResultPaginated<Machine>> {
    return await this.findListsByUsuaSistCodiRepository.find(
      userId,
      pagination
    );
  }
  public async findMessages(
    machineType: MachineType,
    sequenceId: number,
    pagination: Pagination
  ): Promise<ResultPaginated<Message>> {
    const repository = this.getMessageRepository(machineType);
    return await repository.find(sequenceId, pagination);
  }

  public async findOpportunitiesByStageId(
    stageId: number,
    pagination?: Pagination,
    filters?: FindOpportunityFilter
  ): Promise<ResultPaginated<Opportunity>> {
    const cards = await this.findCardsByColumnIdRepository.find(
      stageId,
      pagination,
      filters
    );
    return {
      nextCursor: cards.nextCursor,
      items: cards.items.map(item => {
        return {
          id: item.id,
          stageId: item.columnId,
          name: item.name ?? '',
          email: item.email ?? '',
          phone: item.phone ?? '',
          value: item.value,
          responsible: {
            id: item.responsibleId ?? 0,
            name: item.responsibleName ?? '',
            icon: item.responsibleIcon ?? ''
          },
          createdAt: item.createdAt,
          gainedAt: item.gainedAt ?? undefined,
          losedAt: item.losedAt ?? undefined
        };
      })
    };
  }

  public async findSequences(
    machineId: number,
    pagination: Pagination
  ): Promise<ResultPaginated<Sequence>> {
    return await this.findFunnelsByListCodiRepository.find(
      machineId,
      pagination
    );
  }

  public async logOpportunityRemoval(
    stageId: number,
    opportunityId: number,
    userId: number,
    data: LogData,
    subUserId?: number
  ): Promise<void> {
    await this.insertPipelineHistoryRepository.insert({
      columnId: stageId,
      cardId: opportunityId,
      usuaSistCodi: userId,
      acesCodi: subUserId,
      type: LogType.REMOVED,
      data: formatLogData(data)
    });
  }

  private getCardStatus(opportunityStatus: OpportunityStatus): CardStatus {
    switch (opportunityStatus) {
      case OpportunityStatus.ACTIVE:
        return CardStatus.ACTIVE;
      case OpportunityStatus.REMOVED:
        return CardStatus.REMOVED;
      default:
        return CardStatus.REMOVED;
    }
  }

  private getMessageRepository(
    machineType: MachineType
  ): IFindDefaultModelsByFuniCodiRepository {
    if (machineType === MachineType.MESSENGER) {
      return this.findWhatsAppModelsByFuniCodiRepository;
    }
    if (machineType === MachineType.WHATSAPP) {
      return this.findMessengerModelsByFuniCodiRepository;
    }
    return this.findDefaultModelsByFuniCodiRepository;
  }
}
