import { inject, injectable } from 'tsyringe';

import { IFindBoardResponsiblesRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardResponsiblesRepository';
import { IFindBoardsByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardsByUsuaSistCodiRepository';
import { IFindBoardTemplatesRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardTemplatesRepository';
import ICRMProvider, {
  CRM,
  CRMTemplate,
  CRMTemplateSteps,
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
    private findBoardsByUsuaSistCodi: IFindBoardsByUsuaSistCodiRepository
  ) {}

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
          logo: board.logo,
          title: board.title,
          goal: board.goal,
          createdAt: board.createdAt,
          opportunity: {
            overallQuantity: board.cardQuantity,
            amountWonValue: board.totalCardValue
          },
          responsible: responsibles.map(responsible => ({
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
        steps: boardTemplates.reduce((accumulator, column) => {
          if (column.boardId === boardTemplate.boardId) {
            accumulator.push({
              id: column.columnId,
              title: column.columnTitle,
              color: column.columnColor,
              order: column.columnOrder
            });
          }
          return accumulator;
        }, [] as CRMTemplateSteps[])
      });
    });
    return crmTemplates;
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
