import { inject, injectable } from 'tsyringe';

import { IFindCardByBoardIdAndLeadCodiRepository } from '@common/providers/LeadloversDB/models/cards/IFindCardByBoardIdAndLeadCodiRepository';
import { IFindCardByBoardIdAndLeadPhoneRepository } from '@common/providers/LeadloversDB/models/cards/IFindCardByBoardIdAndLeadPhoneRepository';
import { IFindCardByColumnIdAndLeadCodiRepository } from '@common/providers/LeadloversDB/models/cards/IFindCardByColumnIdAndLeadCodiRepository';
import { IFindCardByColumnIdAndLeadPhoneRepository } from '@common/providers/LeadloversDB/models/cards/IFindCardByColumnIdAndLeadPhoneRepository';
import { IFindCardsByColumnIdRepository } from '@common/providers/LeadloversDB/models/cards/IFindCardsByColumnIdRepository';
import { IInsertCardRepository } from '@common/providers/LeadloversDB/models/cards/IInsertCardRepository';
import { IUpdateCardRepository } from '@common/providers/LeadloversDB/models/cards/IUpdateCardRepository';
import { IUpdateCardsByColumnIdRepository } from '@common/providers/LeadloversDB/models/cards/IUpdateCardsByColumnIdRepository';
import { IUpdateCardsRepository } from '@common/providers/LeadloversDB/models/cards/IUpdateCardsRepository';
import { IFindFunnelsByListCodiRepository } from '@common/providers/LeadloversDB/models/funnels/IFindFunnelsByListCodiRepository';
import { IInsertPipelineDealHistoryRepository } from '@common/providers/LeadloversDB/models/history/IInsertPipelineDealHistoryRepository';
import { IFindLeadsByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/leads/IFindLeadsByUsuaSistCodiRepository';
import { IFindLeadTagByNameRepository } from '@common/providers/LeadloversDB/models/leadTags/IFindLeadTagByNameRepository';
import { IFindLeadTagsByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/leadTags/IFindLeadTagsByUsuaSistCodiRepository';
import { IInsertLeadTagRepository } from '@common/providers/LeadloversDB/models/leadTags/IInsertLeadTagRepository';
import { IInsertLeadUsuaSistTagRepository } from '@common/providers/LeadloversDB/models/leadUsuaSistTags/IInsertLeadUsuaSistTagRepository';
import { IFindListsByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/lists/IFindListsByUsuaSistCodiRepository';
import { IFindDefaultModelsByFuniCodiRepository } from '@common/providers/LeadloversDB/models/models/IFindDefaultModelsByFuniCodiRepository';
import { IRemoveCardNotificationRepository } from '@common/providers/LeadloversDB/models/notifications/IRemoveCardNotificationRepository';
import { IRemoveCardNotificationsRepository } from '@common/providers/LeadloversDB/models/notifications/IRemoveCardNotificationsRepository';
import { CardStatus } from '@common/shared/enums/CardStatus';
import { DealStatus } from '@common/shared/enums/DealStatus';
import { OpportunityLog } from '@common/shared/enums/LogType';
import { MachineType } from '@common/shared/enums/MachineType';
import { OpportunityStatus } from '@common/shared/enums/OpportunityStatus';
import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';
import IOpportunityProvider, {
  Contact,
  FindOpportunityFilter,
  Machine,
  Message,
  Opportunity,
  OpportunityLogParams,
  Sequence,
  Tag
} from '../../models/IOpportunityProvider';

@injectable()
export default class LeadloversOpportunityProvider
  implements IOpportunityProvider
{
  constructor(
    @inject('FindCardByBoardIdAndLeadCodiRepository')
    private findCardByBoardIdAndLeadCodiRepository: IFindCardByBoardIdAndLeadCodiRepository,
    @inject('FindCardByBoardIdAndLeadPhoneRepository')
    private findCardByBoardIdAndLeadPhoneRepository: IFindCardByBoardIdAndLeadPhoneRepository,
    @inject('FindCardByColumnIdAndLeadCodiRepository')
    private findCardByColumnIdAndLeadCodiRepository: IFindCardByColumnIdAndLeadCodiRepository,
    @inject('FindCardByColumnIdAndLeadPhoneRepository')
    private findCardByColumnIdAndLeadPhoneRepository: IFindCardByColumnIdAndLeadPhoneRepository,
    @inject('FindCardsByColumnIdRepository')
    private findCardsByColumnIdRepository: IFindCardsByColumnIdRepository,
    @inject('FindDefaultModelsByFuniCodiRepository')
    private findDefaultModelsByFuniCodiRepository: IFindDefaultModelsByFuniCodiRepository,
    @inject('FindFunnelsByListCodiRepository')
    private findFunnelsByListCodiRepository: IFindFunnelsByListCodiRepository,
    @inject('FindLeadTagByNameRepository')
    private findLeadTagByNameRepository: IFindLeadTagByNameRepository,
    @inject('FindLeadTagsByUsuaSistCodiRepository')
    private findLeadTagsByUsuaSistCodiRepository: IFindLeadTagsByUsuaSistCodiRepository,
    @inject('FindLeadsByUsuaSistCodiRepository')
    private findLeadsByUsuaSistCodiRepository: IFindLeadsByUsuaSistCodiRepository,
    @inject('FindListsByUsuaSistCodiRepository')
    private findListsByUsuaSistCodiRepository: IFindListsByUsuaSistCodiRepository,
    @inject('FindMessengerModelsByFuniCodiRepository')
    private findMessengerModelsByFuniCodiRepository: IFindDefaultModelsByFuniCodiRepository,
    @inject('FindWhatsAppModelsByFuniCodiRepository')
    private findWhatsAppModelsByFuniCodiRepository: IFindDefaultModelsByFuniCodiRepository,
    @inject('InsertCardRepository')
    private insertCardRepository: IInsertCardRepository,
    @inject('InsertLeadTagRepository')
    private insertLeadTagRepository: IInsertLeadTagRepository,
    @inject('InsertLeadUsuaSistTagRepository')
    private insertLeadUsuaSistTagRepository: IInsertLeadUsuaSistTagRepository,
    @inject('InsertPipelineDealHistoryRepository')
    private insertPipelineDealHistoryRepository: IInsertPipelineDealHistoryRepository,
    @inject('RemoveCardNotificationRepository')
    private removeCardNotificationRepository: IRemoveCardNotificationRepository,
    @inject('RemoveCardNotificationsRepository')
    private removeCardNotificationsRepository: IRemoveCardNotificationsRepository,
    @inject('UpdateCardRepository')
    private updateCardRepository: IUpdateCardRepository,
    @inject('UpdateCardsRepository')
    private updateCardsRepository: IUpdateCardsRepository,
    @inject('UpdateCardsByColumnIdRepository')
    private updateCardsByColumnIdRepository: IUpdateCardsByColumnIdRepository
  ) {}

  public async assignResponsibleToOpportunity(
    opportunityId: number,
    responsibleId: number
  ): Promise<
    | {
        oldValues: { responsibleId: number };
        currentValues: Omit<Opportunity, 'gainedAt' | 'losedAt'>;
      }
    | undefined
  > {
    const card = await this.updateCardRepository.update({
      cardId: opportunityId,
      responsibleId
    });
    if (!card) return undefined;
    return {
      oldValues: { responsibleId: card.oldResponsibleId },
      currentValues: {
        id: card.id,
        userId: card.usuaSistCodi ?? 0,
        stageId: card.columnId,
        contactId: card.leadCodi ?? 0,
        name: card.name ?? '',
        email: card.email ?? '',
        phone: card.phone ?? '',
        commercialPhone: card.commercialPhone ?? '',
        score: card.score ?? 0,
        tags: card.tags ?? '',
        value: card.value,
        responsible: {
          id: card.responsibleId ?? 0,
          name: card.responsibleName ?? '',
          icon: card.responsibleIcon ?? ''
        },
        deal: {
          state: this.getDealStatus(card.dealStatus),
          scheduleDate: card.dealScheduleDate ?? undefined
        },
        position: card.position,
        createdAt: card.createdAt
      }
    };
  }

  public async assignResponsibleToOpportunities(
    opportunityIds: number[],
    responsibleId: number
  ): Promise<
    {
      oldValues: { responsibleId: number };
      currentValues: Omit<Opportunity, 'gainedAt' | 'losedAt'>;
    }[]
  > {
    const cards = await this.updateCardsRepository.update({
      cardIds: opportunityIds,
      responsibleId
    });
    return cards.map(card => {
      return {
        oldValues: { responsibleId: card.oldResponsibleId },
        currentValues: {
          id: card.id,
          userId: card.usuaSistCodi ?? 0,
          stageId: card.columnId,
          contactId: card.leadCodi ?? 0,
          name: card.name ?? '',
          email: card.email ?? '',
          phone: card.phone ?? '',
          commercialPhone: card.commercialPhone ?? '',
          score: card.score ?? 0,
          tags: card.tags ?? '',
          value: card.value,
          responsible: {
            id: card.responsibleId ?? 0,
            name: card.responsibleName ?? '',
            icon: card.responsibleIcon ?? ''
          },
          deal: {
            state: this.getDealStatus(card.dealStatus),
            scheduleDate: card.dealScheduleDate ?? undefined
          },
          position: card.position,
          createdAt: card.createdAt
        }
      };
    });
  }

  public async createOpportunity(
    params: Omit<
      Opportunity,
      'id' | 'position' | 'gainedAt' | 'losedAt' | 'createdAt'
    >
  ): Promise<Pick<Opportunity, 'id' | 'position' | 'createdAt'>> {
    const card = await this.insertCardRepository.insert({
      usuaSistCodi: params.userId,
      columnId: params.stageId,
      leadCodi: params.contactId,
      leadName: params.name,
      leadEmail: params.email,
      leadPhone: params.phone,
      leadCommercialPhone: params.commercialPhone,
      leadScore: params.score,
      leadTags: params.tags,
      value: params.value,
      dealStatus: this.getLeadloversDealStatus(params.deal.state),
      acesCodi: params.responsible?.id,
      dealScheduleDate: params.deal.scheduleDate,
      notifications: false
    });
    return card;
  }

  public async createTag(
    userId: number,
    name: string
  ): Promise<Pick<Tag, 'id'>> {
    return await this.insertLeadTagRepository.insert(userId, name);
  }

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

  public async deleteOpportunities(opportunityIds: number[]): Promise<
    {
      oldValues: { status: number };
      currentValues: Omit<Opportunity, 'gainedAt' | 'losedAt'>;
    }[]
  > {
    const cards = await this.updateCardsRepository.update({
      cardIds: opportunityIds,
      status: CardStatus.REMOVED
    });
    return cards.map(card => {
      return {
        oldValues: { status: card.oldStatus },
        currentValues: {
          id: card.id,
          userId: card.usuaSistCodi ?? 0,
          stageId: card.columnId,
          contactId: card.leadCodi ?? 0,
          name: card.name ?? '',
          email: card.email ?? '',
          phone: card.phone ?? '',
          commercialPhone: card.commercialPhone ?? '',
          score: card.score ?? 0,
          tags: card.tags ?? '',
          value: card.value,
          responsible: {
            id: card.responsibleId ?? 0,
            name: card.responsibleName ?? '',
            icon: card.responsibleIcon ?? ''
          },
          deal: {
            state: this.getDealStatus(card.dealStatus),
            scheduleDate: card.dealScheduleDate ?? undefined
          },
          position: card.position,
          createdAt: card.createdAt
        }
      };
    });
  }

  public async deleteOpportunitiesByStageId(stageId: number): Promise<
    {
      oldValues: { status: number };
      currentValues: Omit<Opportunity, 'gainedAt' | 'losedAt'>;
    }[]
  > {
    const cards = await this.updateCardsByColumnIdRepository.update({
      columnId: stageId,
      status: CardStatus.REMOVED
    });
    return cards.map(card => {
      return {
        oldValues: { status: card.oldStatus },
        currentValues: {
          id: card.id,
          userId: card.usuaSistCodi ?? 0,
          stageId: card.columnId,
          contactId: card.leadCodi ?? 0,
          name: card.name ?? '',
          email: card.email ?? '',
          phone: card.phone ?? '',
          commercialPhone: card.commercialPhone ?? '',
          score: card.score ?? 0,
          tags: card.tags ?? '',
          value: card.value,
          responsible: {
            id: card.responsibleId ?? 0,
            name: card.responsibleName ?? '',
            icon: card.responsibleIcon ?? ''
          },
          deal: {
            state: this.getDealStatus(card.dealStatus),
            scheduleDate: card.dealScheduleDate ?? undefined
          },
          position: card.position,
          createdAt: card.createdAt
        }
      };
    });
  }

  public async deleteOpportunity(opportunityId: number): Promise<
    | {
        oldValues: { status: number };
        currentValues: Omit<Opportunity, 'gainedAt' | 'losedAt'>;
      }
    | undefined
  > {
    const card = await this.updateCardRepository.update({
      cardId: opportunityId,
      status: CardStatus.REMOVED
    });
    if (!card) return undefined;
    return {
      oldValues: { status: card.oldStatus },
      currentValues: {
        id: card.id,
        userId: card.usuaSistCodi ?? 0,
        stageId: card.columnId,
        contactId: card.leadCodi ?? 0,
        name: card.name ?? '',
        email: card.email ?? '',
        phone: card.phone ?? '',
        commercialPhone: card.commercialPhone ?? '',
        score: card.score ?? 0,
        tags: card.tags ?? '',
        value: card.value,
        responsible: {
          id: card.responsibleId ?? 0,
          name: card.responsibleName ?? '',
          icon: card.responsibleIcon ?? ''
        },
        deal: {
          state: this.getDealStatus(card.dealStatus),
          scheduleDate: card.dealScheduleDate ?? undefined
        },
        position: card.position,
        createdAt: card.createdAt
      }
    };
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

  public async findOpportunityByCRMIdAndContactId(
    crmId: number,
    contactId: number
  ): Promise<Pick<Opportunity, 'id'> | undefined> {
    const cardId = await this.findCardByBoardIdAndLeadCodiRepository.find(
      crmId,
      contactId
    );
    if (!cardId) return undefined;
    return { id: cardId };
  }

  public async findOpportunityByCRMIdAndPhone(
    crmId: number,
    phone: string
  ): Promise<Pick<Opportunity, 'id'> | undefined> {
    const cardId = await this.findCardByBoardIdAndLeadPhoneRepository.find(
      crmId,
      phone
    );
    if (!cardId) return undefined;
    return { id: cardId };
  }

  public async findOpportunityByStageIdAndContactId(
    stageId: number,
    contactId: number
  ): Promise<Pick<Opportunity, 'id'> | undefined> {
    const cardId = await this.findCardByColumnIdAndLeadCodiRepository.find(
      stageId,
      contactId
    );
    if (!cardId) return undefined;
    return { id: cardId };
  }

  public async findOpportunityByStageIdAndPhone(
    stageId: number,
    phone: string
  ): Promise<Pick<Opportunity, 'id'> | undefined> {
    const cardId = await this.findCardByColumnIdAndLeadPhoneRepository.find(
      stageId,
      phone
    );
    if (!cardId) return undefined;
    return { id: cardId };
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
          userId: item.usuaSistCodi ?? 0,
          stageId: item.columnId,
          contactId: item.leadCodi ?? 0,
          name: item.name ?? '',
          email: item.email ?? '',
          phone: item.phone ?? '',
          commercialPhone: item.commercialPhone ?? '',
          score: item.score ?? 0,
          tags: item.tags ?? '',
          value: item.value,
          responsible: {
            id: item.responsibleId ?? 0,
            name: item.responsibleName ?? '',
            icon: item.responsibleIcon ?? ''
          },
          deal: {
            state: this.getDealStatus(item.dealStatus),
            scheduleDate: item.dealScheduleDate ?? undefined
          },
          position: item.position,
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

  public async findTagByName(
    userId: number,
    name: string
  ): Promise<Tag | undefined> {
    return await this.findLeadTagByNameRepository.find(userId, name);
  }

  public async findTagsByUserId(userId: number): Promise<Tag[]> {
    return await this.findLeadTagsByUsuaSistCodiRepository.find(userId);
  }

  public async logOpportunityCreation(
    params: OpportunityLogParams
  ): Promise<void> {
    await this.insertPipelineDealHistoryRepository.insert({
      type: OpportunityLog.CREATED,
      dealId: params.opportunity.id,
      columnSourceId: params.stage.sourceId,
      columnDestinationId: params.stage.destinationId,
      dealDataBefore: JSON.stringify(params.opportunity.dataBefore),
      dealDataAfter: JSON.stringify(params.opportunity.dataAfter),
      annotationId: undefined,
      usuaSistCodi: params.userId,
      acesCodi: params.subUserId
    });
  }

  public async logOpportunityMovement(
    params: OpportunityLogParams
  ): Promise<void> {
    await this.insertPipelineDealHistoryRepository.insert({
      type: OpportunityLog.MOVED,
      dealId: params.opportunity.id,
      columnSourceId: params.stage.sourceId,
      columnDestinationId: params.stage.destinationId,
      dealDataBefore: JSON.stringify(params.opportunity.dataBefore),
      dealDataAfter: JSON.stringify(params.opportunity.dataAfter),
      annotationId: undefined,
      usuaSistCodi: params.userId,
      acesCodi: params.subUserId
    });
  }

  public async logOpportunityRemoval(
    params: OpportunityLogParams
  ): Promise<void> {
    await this.insertPipelineDealHistoryRepository.insert({
      type: OpportunityLog.REMOVED,
      dealId: params.opportunity.id,
      columnSourceId: params.stage.sourceId,
      columnDestinationId: params.stage.destinationId,
      dealDataBefore: JSON.stringify(params.opportunity.dataBefore),
      dealDataAfter: JSON.stringify(params.opportunity.dataAfter),
      annotationId: undefined,
      usuaSistCodi: params.userId,
      acesCodi: params.subUserId
    });
  }

  public async logResponsibleAssignmentToOpportunity(
    params: OpportunityLogParams
  ): Promise<void> {
    await this.insertPipelineDealHistoryRepository.insert({
      type: OpportunityLog.RESPONSIBLE_ASSIGNMENT,
      dealId: params.opportunity.id,
      columnSourceId: params.stage.sourceId,
      columnDestinationId: params.stage.destinationId,
      dealDataBefore: JSON.stringify(params.opportunity.dataBefore),
      dealDataAfter: JSON.stringify(params.opportunity.dataAfter),
      annotationId: undefined,
      usuaSistCodi: params.userId,
      acesCodi: params.subUserId
    });
  }

  public async moveOpportunity(
    opportunityId: number,
    destinationStageId: number
  ): Promise<
    | {
        oldValues: { stageId: number; position: number };
        currentValues: Omit<Opportunity, 'gainedAt' | 'losedAt'>;
      }
    | undefined
  > {
    const card = await this.updateCardRepository.update({
      cardId: opportunityId,
      columnId: destinationStageId,
      setSequencialPosition: true
    });
    if (!card) return undefined;
    return {
      oldValues: { stageId: card.oldColumnId, position: card.oldPosition },
      currentValues: {
        id: card.id,
        userId: card.usuaSistCodi ?? 0,
        stageId: card.columnId,
        contactId: card.leadCodi ?? 0,
        name: card.name ?? '',
        email: card.email ?? '',
        phone: card.phone ?? '',
        commercialPhone: card.commercialPhone ?? '',
        score: card.score ?? 0,
        tags: card.tags ?? '',
        value: card.value,
        responsible: {
          id: card.responsibleId ?? 0,
          name: card.responsibleName ?? '',
          icon: card.responsibleIcon ?? ''
        },
        deal: {
          state: this.getDealStatus(card.dealStatus),
          scheduleDate: card.dealScheduleDate ?? undefined
        },
        position: card.position,
        createdAt: card.createdAt
      }
    };
  }

  public async moveOpportunities(
    opportunityIds: number[],
    destinationStageId: number
  ): Promise<
    {
      oldValues: { stageId: number; position: number };
      currentValues: Omit<Opportunity, 'gainedAt' | 'losedAt'>;
    }[]
  > {
    const cards = await this.updateCardsRepository.update({
      cardIds: opportunityIds,
      columnId: destinationStageId,
      setSequencialPosition: true
    });
    return cards.map(card => {
      return {
        oldValues: { stageId: card.oldColumnId, position: card.oldPosition },
        currentValues: {
          id: card.id,
          userId: card.usuaSistCodi ?? 0,
          stageId: card.columnId,
          contactId: card.leadCodi ?? 0,
          name: card.name ?? '',
          email: card.email ?? '',
          phone: card.phone ?? '',
          commercialPhone: card.commercialPhone ?? '',
          score: card.score ?? 0,
          tags: card.tags ?? '',
          value: card.value,
          responsible: {
            id: card.responsibleId ?? 0,
            name: card.responsibleName ?? '',
            icon: card.responsibleIcon ?? ''
          },
          deal: {
            state: this.getDealStatus(card.dealStatus),
            scheduleDate: card.dealScheduleDate ?? undefined
          },
          position: card.position,
          createdAt: card.createdAt
        }
      };
    });
  }

  public async tagContact(contactId: number, tagId: number): Promise<void> {
    await this.insertLeadUsuaSistTagRepository.insert(contactId, tagId);
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

  private getDealStatus(cardDealStatus?: number | null): DealStatus {
    if (!cardDealStatus) return DealStatus.OPENED;
    switch (cardDealStatus) {
      case 1:
        return DealStatus.GAINED;
      case 0:
        return DealStatus.LOSED;
      default:
        return DealStatus.OPENED;
    }
  }

  private getLeadloversDealStatus(
    opportunityDealStatus: DealStatus
  ): number | undefined {
    switch (opportunityDealStatus) {
      case 'OPENED':
        return undefined;
      case 'GAINED':
        return 1;
      case 'LOSED':
        return 0;
      default:
        return undefined;
    }
  }
}
