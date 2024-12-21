import { inject, injectable } from 'tsyringe';

import { ISumValueOfColumnsRepository } from '@common/providers/LeadloversDB/models/insights/ISumValueOfColumnsRepository';
import { ISumWonOpportunitiesGroupedByCreationDateRepository } from '@common/providers/LeadloversDB/models/insights/ISumWonOpportunitiesGroupedByCreationDateRepository';
import IRevenueReportProvider, {
  CurrentCRMValue,
  EarnedRevenue,
  RevenueReportFilters
} from '../../models/IRevenueReportProvider';

@injectable()
export default class LeadloversRevenueReportProvider
  implements IRevenueReportProvider
{
  constructor(
    @inject('SumWonOpportunitiesGroupedByCreationDateRepository')
    private sumWonOpportunitiesGroupedByCreationDateRepository: ISumWonOpportunitiesGroupedByCreationDateRepository,
    @inject('SumValueOfColumnsRepository')
    private sumValueOfColumnsRepository: ISumValueOfColumnsRepository
  ) {}

  public async getEarnedRevenue(
    boardId: number,
    initialDate: Date,
    endDate: Date,
    filters?: RevenueReportFilters
  ): Promise<EarnedRevenue[]> {
    const result =
      await this.sumWonOpportunitiesGroupedByCreationDateRepository.sum(
        boardId,
        initialDate,
        endDate,
        filters
      );
    return result.map(item => {
      return {
        creationDate: item.creationDate,
        opportunitiesNumber: item.opportunitiesNumber,
        opportunitiesValue: item.opportunitiesValue
      };
    });
  }

  public async getCurrentCRMValue(
    boardId: number,
    filters?: RevenueReportFilters
  ): Promise<CurrentCRMValue[]> {
    const result = await this.sumValueOfColumnsRepository.sum(boardId, filters);
    return result.map(item => {
      return {
        columName: item.columName,
        estimatedGoal: item.estimatedGoal,
        opportunitiesValue: item.opportunitiesValue,
        orderNumber: item.orderNumber
      };
    });
  }
}
