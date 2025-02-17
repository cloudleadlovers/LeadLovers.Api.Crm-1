import { inject, injectable } from 'tsyringe';

import { IInsertBoardAccessRepository } from '@common/providers/LeadloversDB/models/boardAccess/IInsertBoardAccessRepository';
import { IFindBoardAccessByBoardIdRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardAccessByBoardIdRepository';
import { IFindBoardRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardRepository';
import { IFindBoardResponsiblesRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardResponsiblesRepository';
import { IFindBoardsByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardsByUsuaSistCodiRepository';
import { IInsertBoardRepository } from '@common/providers/LeadloversDB/models/boards/IInsertBoardRepository';
import { IUpdateBoardRepository } from '@common/providers/LeadloversDB/models/boards/IUpdateBoardRepository';
import { IFindCardLayoutByBoardIdRepository } from '@common/providers/LeadloversDB/models/cardLayouts/IFindCardLayoutByBoardIdRepository';
import { IInsertCardLayoutRepository } from '@common/providers/LeadloversDB/models/cardLayouts/IInsertCardLayoutRepository';
import { IInsertPipelineHistoryRepository } from '@common/providers/LeadloversDB/models/history/IInsertPipelineHistoryRepository';
import { IFindUsersByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/users/IFindUsersByUsuaSistCodiRepository';
import { CRMOwnerRole } from '@common/shared/enums/CRMOwnerRole';
import { LogType } from '@common/shared/enums/LogType';
import { LogData } from '@common/shared/types/LogData';
import { OpportunityLayout } from '@common/shared/types/OpportunityLayout';
import { formatLogData } from '@common/utils/formatLogData';
import ICRMProvider, {
  CRM,
  CRMOwner,
  FindCRMsFilters,
  OpportunityDisplayLayout
} from '../../models/ICRMProvider';

@injectable()
export default class LeadloversCRMProvider implements ICRMProvider {
  constructor(
    @inject('FindBoardAccessByBoardIdRepository')
    private findBoardAccessByBoardIdRepository: IFindBoardAccessByBoardIdRepository,
    @inject('FindBoardRepository')
    private findBoardRepository: IFindBoardRepository,
    @inject('FindBoardResponsiblesRepository')
    private findBoardResponsibles: IFindBoardResponsiblesRepository,
    @inject('FindBoardsByUsuaSistCodiRepository')
    private findBoardsByUsuaSistCodi: IFindBoardsByUsuaSistCodiRepository,
    @inject('FindCardLayoutByBoardIdRepository')
    private findCardLayoutByBoardIdRepository: IFindCardLayoutByBoardIdRepository,
    @inject('FindUsersByUsuaSistCodiRepository')
    private findUsersByUsuaSistCodiRepository: IFindUsersByUsuaSistCodiRepository,
    @inject('InsertBoardAccessRepository')
    private insertBoardAccessRepository: IInsertBoardAccessRepository,
    @inject('InsertBoardRepository')
    private insertBoardRepository: IInsertBoardRepository,
    @inject('InsertCardLayoutRepository')
    private insertCardLayoutRepository: IInsertCardLayoutRepository,
    @inject('InsertPipelineHistoryRepository')
    private insertPipelineHistoryRepository: IInsertPipelineHistoryRepository,
    @inject('UpdateBoardRepository')
    private updateBoardRepository: IUpdateBoardRepository
  ) {}

  public async assignOwnerToCRM(
    crmId: number,
    ownerId: number,
    roleId: number
  ): Promise<void> {
    await this.insertBoardAccessRepository.insert(crmId, ownerId, roleId);
  }

  public async createCRM(
    params: Pick<
      CRM,
      | 'userId'
      | 'name'
      | 'description'
      | 'goal'
      | 'goalRecurrency'
      | 'goalRecurrencyStartIn'
      | 'goalRecurrencyFinishIn'
      | 'rule'
      | 'logo'
    >
  ): Promise<Pick<CRM, 'id'>> {
    const boardId = await this.insertBoardRepository.insert({
      ...params,
      title: params.name,
      usuaSistCodi: params.userId
    });
    return { id: boardId };
  }

  public async createLayoutForOpportunitiesDisplay(
    crmId: number,
    layout: OpportunityLayout
  ): Promise<void> {
    await this.insertCardLayoutRepository.insert({
      boardId: crmId,
      layout: {
        leadCodi: layout.contactId,
        leadEmail: layout.email,
        leadName: layout.name,
        leadPhone: layout.phone,
        leadCommercialPhone: layout.commercialPhone,
        leadScore: layout.score,
        leadTags: layout.tags,
        value: layout.value,
        dealStatus: layout.dealStatus,
        dealScheduleDate: layout.dealScheduleDate
      }
    });
  }

  public async findCRM(
    crmId: number
  ): Promise<Omit<CRM, 'opportunity' | 'owners'> | undefined> {
    const board = await this.findBoardRepository.find(crmId);
    if (!board) return undefined;
    return {
      id: board.id,
      userId: board.userId,
      name: board.title,
      description: board.description,
      rule: board.rule,
      logo: board.logo,
      goal: board.goal,
      goalRecurrency: board.goalRecurrency,
      goalRecurrencyStartIn: board.goalRecurrencyStartIn,
      goalRecurrencyFinishIn: board.goalRecurrencyFinishIn,
      createdAt: board.createdAt
    };
  }

  public async findCRMsByUserId(
    userId: number,
    filters?: FindCRMsFilters
  ): Promise<CRM[]> {
    const boards = await this.findBoardsByUsuaSistCodi.find(userId, filters);
    return await Promise.all(
      boards.map(async board => {
        const responsibles = await this.findBoardResponsibles.find(
          board.id,
          filters
        );
        return {
          id: board.id,
          userId: board.userId,
          logo: board.logo,
          name: board.title,
          description: board.description,
          goal: board.goal,
          goalRecurrency: board.goalRecurrency,
          goalRecurrencyStartIn: board.goalRecurrencyStartIn,
          goalRecurrencyFinishIn: board.goalRecurrencyFinishIn,
          rule: board.rule,
          createdAt: board.createdAt,
          opportunity: {
            overallQuantity: board.cardQuantity,
            amountWonValue: board.totalCardValue
          },
          owners: responsibles.map(responsible => ({
            id: responsible.id,
            name: responsible.name,
            photo: responsible.photo,
            roleId: responsible.roleId,
            roleName: this.getRoleName(responsible.roleId)
          }))
        };
      })
    );
  }

  public async findOpportunityDisplayLayoutByCrmId(
    crmId: number
  ): Promise<OpportunityDisplayLayout | undefined> {
    const result = await this.findCardLayoutByBoardIdRepository.find(crmId);
    if (!result) return undefined;
    return {
      id: result.id,
      crmId: result.boardId,
      layout: {
        contactId: result.layout.leadCodi,
        email: result.layout.leadEmail,
        name: result.layout.leadName,
        phone: result.layout.leadPhone,
        commercialPhone: result.layout.leadCommercialPhone,
        score: result.layout.leadScore,
        tags: result.layout.leadTags,
        value: result.layout.value,
        dealStatus: result.layout.dealStatus,
        dealScheduleDate: result.layout.dealScheduleDate
      },
      createdAt: result.createdAt
    };
  }

  public async findPotentialOwnersByUserId(
    userId: number
  ): Promise<Pick<CRMOwner, 'id' | 'name' | 'photo'>[]> {
    return await this.findUsersByUsuaSistCodiRepository.find(userId);
  }

  public async findOwnersByCRMId(crmId: number): Promise<CRMOwner[]> {
    const owners = await this.findBoardAccessByBoardIdRepository.find(crmId);
    return owners.map(owner => {
      return {
        id: owner.userId,
        name: owner.userName,
        photo: owner.userPhoto,
        roleId: owner.accessId,
        roleName: this.getRoleName(owner.accessId)
      };
    });
  }

  public async logCRMCreation(
    crmId: number,
    userId: number,
    data: LogData,
    subUserId?: number
  ): Promise<void> {
    await this.insertPipelineHistoryRepository.insert({
      boardId: crmId,
      usuaSistCodi: userId,
      acesCodi: subUserId,
      type: LogType.CREATED,
      data: formatLogData(data)
    });
  }

  public async updateCRM(
    params: Pick<CRM, 'id'> &
      Partial<
        Pick<
          CRM,
          | 'logo'
          | 'name'
          | 'goal'
          | 'goalRecurrency'
          | 'goalRecurrencyStartIn'
          | 'goalRecurrencyFinishIn'
        >
      >
  ): Promise<void> {
    await this.updateBoardRepository.update({
      ...params,
      boardId: params.id,
      title: params.name
    });
  }

  private getRoleName(roleId: number): CRMOwnerRole {
    switch (roleId) {
      case 1:
        return CRMOwnerRole.READER;
      case 2:
        return CRMOwnerRole.EDITOR;
      case 3:
        return CRMOwnerRole.ADMINISTRATOR;
      default:
        return CRMOwnerRole.READER;
    }
  }
}
