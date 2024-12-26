export type DealStatus = 'OPENED' | 'LOSED' | 'GAINED';

export type ConversionRateFilters = {
  stateCards?: DealStatus[];
  createInitialDate?: string;
  createEndDate?: string;
  closedInitialDate?: string;
  closedEndDate?: string;
  responsibles?: { in: number[]; notIn: number[] };
};

export type AverageDealDuration = {
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
  averageDealDuration(
    boardId: number,
    days: number,
    filters?: ConversionRateFilters
  ): Promise<AverageDealDuration[]>;
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
