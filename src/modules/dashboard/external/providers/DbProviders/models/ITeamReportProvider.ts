export type DealStatus = 'OPENED' | 'LOSED' | 'GAINED';

export type TeamReportFilters = {
  stateCards?: DealStatus[];
  createInitialDate?: string;
  createEndDate?: string;
  closedInitialDate?: string;
  closedEndDate?: string;
  responsibleId?: number;
};

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
