import { InsightFiltersJSON } from '@modules/dashboard/shared/types/InsightFilter';

export type RevenueReportFilters = InsightFiltersJSON;

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
