import { InsightFiltersJSON } from '@modules/dashboard/shared/types/InsightFilter';

export type TeamReportFilters = InsightFiltersJSON;

export type TeamReport = {
  responsibleName: string;
  valueOportunities: number;
  countWinOpportunities: number;
  winAmount: number;
  averageTimeToWinDays: number;
  winRate: number;
};

export default interface ITeamReportProvider {
  getTeamReport(
    boardId: number,
    filters?: TeamReportFilters
  ): Promise<TeamReport[]>;
}
