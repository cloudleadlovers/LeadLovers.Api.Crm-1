import { InsightFiltersJSON } from '@modules/dashboard/shared/types/InsightFilter';

export type ConversionRateFilters = InsightFiltersJSON;

export type AverageDaysToCloseOpportunity = {
  days: number;
};

export type AverageDealDurationPerStage = {
  stageTitle: string;
  averageDealDuration: number;
  stageOrderNumber: number;
};

export type ConversionRate = {
  stageId: number;
  stageTitle: string;
  stageType: string;
  quantityOpportunities: number;
  totalValueOpportunities: number;
  winCount: number;
  winAmountValue: number;
};

export type GainConversionRate = {
  stageType: string;
  quantityOpportunities: number;
  totalValueOpportunities: number;
};

export type LossReasons = {
  reason: string;
  lossPercentage: number;
  lossCount: number;
};

export default interface IConversionRateProvider {
  averageDaysToCloseOpportunity(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<AverageDaysToCloseOpportunity>;
  averageDealDurationPerStage(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<AverageDealDurationPerStage[]>;
  averageValueOfWonOpportunities(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<number>;
  getConversionRate(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<ConversionRate[]>;
  getGainConversionRate(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<GainConversionRate | undefined>;
  getLossReasons(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<LossReasons[]>;
}
