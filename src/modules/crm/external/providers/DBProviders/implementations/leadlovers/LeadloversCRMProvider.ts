import { inject, injectable } from 'tsyringe';

import { IFindBoardResponsiblesRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardResponsiblesRepository';
import { IFindBoardsByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/boards/IFindBoardsByUsuaSistCodiRepository';
import ICRMProvider, { CRM, FindCRMsFilters } from '../../models/ICRMProvider';

@injectable()
export default class LeadloversCRMProvider implements ICRMProvider {
  constructor(
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
            totalQuantity: board.cardQuantity,
            totalValueWon: board.totalCardValue
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
