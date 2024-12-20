import { inject, injectable } from 'tsyringe';

import { IFindOpportunityStatisticsByResponsibleRepository } from '@common/providers/LeadloversDB/models/IFindOpportunityStatisticsByResponsibleRepository';
import ITeamReportProvider, {
  TeamReport,
  TeamReportFilters
} from '../../models/ITeamReportProvider';

@injectable()
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
        winRate:
          item.totalOpportunities > 0
            ? (item.countWinOpportunities / item.totalOpportunities) * 100
            : 0,
        valueOportunities: item.valueOportunities,
        averageTimeToWinDays: item.averageTimeToWinDays ?? 0,
        winAmount: item.winAmount,
        countWinOpportunities: item.countWinOpportunities
      };
    });
  }
}
