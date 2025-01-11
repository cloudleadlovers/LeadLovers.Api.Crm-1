import { inject, injectable } from 'tsyringe';

import { IFindColumnsByBoardIdRepository } from '@common/providers/LeadloversDB/models/columns/IFindColumnsByBoardIdRepository';
import IStageProvider, {
  FindStageFilter,
  Stage
} from '../../models/IStageProvider';

@injectable()
export default class LeadloversStageProvider implements IStageProvider {
  constructor(
    @inject('FindColumnsByBoardIdRepository')
    private findColumnsByBoardIdRepository: IFindColumnsByBoardIdRepository
  ) {}

  public async findStagesByCRMId(
    crmId: number,
    filters?: FindStageFilter
  ): Promise<Stage[]> {
    const columnFilters = filters?.stage
      ? { column: filters.stage }
      : undefined;
    const columns = await this.findColumnsByBoardIdRepository.find(
      crmId,
      columnFilters
    );
    return columns.map(column => {
      return {
        id: column.id,
        crmId: column.boardId,
        name: column.name,
        color: column.color,
        order: column.order,
        amountCards: column.amountCards,
        earnedRevenue: column.earnedRevenue,
        createdAt: column.createdAt
      };
    });
  }
}
