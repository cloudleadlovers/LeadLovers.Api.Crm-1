import { inject, injectable } from 'tsyringe';

import { IFindOpportunityStatisticsByResponsibleRepository } from '@common/providers/LeadloversDB/models/insights/IFindOpportunityStatisticsByResponsibleRepository';
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
          item.totalCards > 0
            ? (item.countWinCards / item.totalCards) * 100
            : 0,
        valueOportunities: item.valueCards,
        averageTimeToWinDays: item.averageTimeToWinDays ?? 0,
        winAmount: item.winAmount,
        countWinOpportunities: item.countWinCards
      };
    });
  }
}
