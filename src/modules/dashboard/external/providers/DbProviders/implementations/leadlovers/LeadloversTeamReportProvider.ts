import { inject } from 'tsyringe';

import { IFindOpportunityStatisticsByResponsibleRepository } from '@common/providers/LeadloversProvider/models/IFindOpportunityStatisticsByResponsibleRepository';
import ITeamReportProvider, {
  TeamReport,
  TeamReportFilters
} from '../../models/ITeamReportProvider';

export default class LeadloversTeamReportProvider
  implements ITeamReportProvider
{
  constructor(
    @inject('FindOpportunityStatisticsByResponsibleRepository')
    private findOpportunityStatisticsByResponsibleRepository: IFindOpportunityStatisticsByResponsibleRepository
  ) {}

  public async getTeamReport(
    boardId: number,
    filters?: TeamReportFilters
  ): Promise<TeamReport[]> {
    const result =
      await this.findOpportunityStatisticsByResponsibleRepository.find(
        boardId,
        filters
      );
    return result.map(item => {
      return {
        responsibleName: item.responsibleName,
        winRate: (item.countWinOpportunities / item.totalOpportunities) * 100,
        valueOportunities: item.valueOportunities,
        averageTimeToWinDays: item.averageTimeToWinDays,
        winAmount: item.winAmount,
        countWinOpportunities: item.countWinOpportunities
      };
    });
  }
}
