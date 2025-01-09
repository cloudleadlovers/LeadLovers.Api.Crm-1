import { inject, injectable } from 'tsyringe';

import { IFindBoardResponsiblesRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardResponsiblesRepository';
import { IFindBoardsByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardsByUsuaSistCodiRepository';
import { IFindBoardTemplatesRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardTemplatesRepository';
import { IInsertBoardAccessRepository } from '@common/providers/LeadloversDB/models/boards/IInsertBoardAccessRepository';
import { IInsertBoardRepository } from '@common/providers/LeadloversDB/models/boards/IInsertBoardRepository';
import { IInsertColumnRepository } from '@common/providers/LeadloversDB/models/columns/IInsertColumnRepository';
import { IFindUsersByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/users/IFindUsersByUsuaSistCodiRepository';
import ICRMProvider, {
  CRM,
  CRMOwner,
  CRMStage,
  CRMTemplate,
  FindCRMsFilters
} from '../../models/ICRMProvider';

@injectable()
export default class LeadloversCRMProvider implements ICRMProvider {
  constructor(
    @inject('FindBoardTemplatesRepository')
    private findBoardTemplatesRepository: IFindBoardTemplatesRepository,
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
    @inject('InsertColumnRepository')
    private insertColumnRepository: IInsertColumnRepository
  ) {}

  public async assignOwnerToCRM(
    crmId: number,
    ownerId: number,
    roleId: number
  ): Promise<void> {
    await this.insertBoardAccessRepository.insert(crmId, ownerId, roleId);
  }

  public async createCRM(
    params: Pick<CRM, 'userId' | 'title' | 'goal' | 'rule' | 'logo'>
  ): Promise<Pick<CRM, 'id'>> {
    const boardId = await this.insertBoardRepository.insert(params);
    return { id: boardId };
  }

  public async createCRMStage(
    params: Pick<CRMStage, 'crmId' | 'title' | 'order' | 'color'>
  ): Promise<void> {
    await this.insertColumnRepository.insert(
      params.crmId,
      params.title,
      params.order,
      params.color
    );
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
          title: board.title,
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

  public async findCRMTemplates(): Promise<CRMTemplate[]> {
    const boardTemplates = await this.findBoardTemplatesRepository.find();
    const crmTemplates: CRMTemplate[] = [];
    boardTemplates.forEach(boardTemplate => {
      crmTemplates.push({
        id: boardTemplate.boardId,
        title: boardTemplate.boardTitle,
        stage: boardTemplates.reduce((accumulator, column) => {
          if (column.boardId === boardTemplate.boardId) {
            accumulator.push({
              id: column.columnId,
              crmId: column.boardId,
              title: column.columnTitle,
              color: column.columnColor,
              order: column.columnOrder
            });
          }
          return accumulator;
        }, [] as CRMStage[])
      });
    });
    return crmTemplates;
  }

  public async findPotentialOwnersByUserId(
    userId: number
  ): Promise<Pick<CRMOwner, 'id' | 'name' | 'photo'>[]> {
    return await this.findUsersByUsuaSistCodiRepository.find(userId);
  }

  private getRoleName(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'Reader';
      case 2:
        return 'Editor';
      case 3:
        return 'Administrator';
      default:
        return 'Reader';
    }
  }
}
