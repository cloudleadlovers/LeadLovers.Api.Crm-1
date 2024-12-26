export type DealStatus = 'OPENED' | 'LOSED' | 'GAINED';

export type RevenueReportFilters = {
  stateCards?: DealStatus[];
  createInitialDate?: string;
  createEndDate?: string;
  closedInitialDate?: string;
  closedEndDate?: string;
  responsibles?: { in: number[]; notIn: number[] };
};

export type EarnedRevenue = {
  creationDate: Date;
  opportunitiesValue: number;
  opportunitiesNumber: number;
};

export type CurrentCRMValue = {
  columName: string;
  estimatedGoal: number;
  opportunitiesValue: number;
  orderNumber: number;
};

export default interface IRevenueReportProvider {
  getEarnedRevenue(
    boardId: number,
    initialDate: Date,
    endDate: Date,
    filters?: RevenueReportFilters
  ): Promise<EarnedRevenue[]>;
  getCurrentCRMValue(
    boardId: number,
    filters?: RevenueReportFilters
  ): Promise<CurrentCRMValue[]>;
}
