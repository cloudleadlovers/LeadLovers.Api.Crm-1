import { inject, injectable } from 'tsyringe';

import { IFindBoardResponsiblesRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardResponsiblesRepository';
import { IFindBoardsByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardsByUsuaSistCodiRepository';
import { IInsertBoardAccessRepository } from '@common/providers/LeadloversDB/models/boards/IInsertBoardAccessRepository';
import { IInsertBoardRepository } from '@common/providers/LeadloversDB/models/boards/IInsertBoardRepository';
import { IInsertPipelineHistoryRepository } from '@common/providers/LeadloversDB/models/history/IInsertPipelineHistoryRepository';
import { IFindUsersByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/users/IFindUsersByUsuaSistCodiRepository';
import { CRMOwnerRole } from '@common/shared/enums/CRMOwnerRole';
import { LogType } from '@common/shared/enums/LogType';
import { LogData } from '@common/shared/types/LogData';
import { formatLogData } from '@common/utils/formatLogData';
import ICRMProvider, {
  CRM,
  CRMOwner,
  FindCRMsFilters
} from '../../models/ICRMProvider';

@injectable()
export default class LeadloversCRMProvider implements ICRMProvider {
  constructor(
    @inject('FindBoardResponsiblesRepository')
    private findBoardResponsibles: IFindBoardResponsiblesRepository,
    @inject('FindBoardsByUsuaSistCodiRepository')
    private findBoardsByUsuaSistCodi: IFindBoardsByUsuaSistCodiRepository,
    @inject('FindUsersByUsuaSistCodiRepository')
    private findUsersByUsuaSistCodiRepository: IFindUsersByUsuaSistCodiRepository,
    @inject('InsertBoardAccessRepository')
    private insertBoardAccessRepository: IInsertBoardAccessRepository,
    @inject('InsertBoardRepository')
    private insertBoardRepository: IInsertBoardRepository,
    @inject('InsertPipelineHistoryRepository')
    private insertPipelineHistoryRepository: IInsertPipelineHistoryRepository
  ) {}

  public async assignOwnerToCRM(
    crmId: number,
    ownerId: number,
    roleId: number
  ): Promise<void> {
    await this.insertBoardAccessRepository.insert(crmId, ownerId, roleId);
  }

  public async createCRM(
    params: Pick<CRM, 'userId' | 'name' | 'goal' | 'rule' | 'logo'>
  ): Promise<Pick<CRM, 'id'>> {
    const boardId = await this.insertBoardRepository.insert({
      ...params,
      title: params.name,
      usuaSistCodi: params.userId
    });
    return { id: boardId };
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
          goal: board.goal,
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

  public async findPotentialOwnersByUserId(
    userId: number
  ): Promise<Pick<CRMOwner, 'id' | 'name' | 'photo'>[]> {
    return await this.findUsersByUsuaSistCodiRepository.find(userId);
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
