import { InsightFiltersJSON } from '@modules/dashboard/shared/types/InsightFilter';

export type DealStatus = 'OPENED' | 'LOSED' | 'GAINED';

export type PipelineReportsFilters = InsightFiltersJSON;

export type PipelineReportsQueryFilters = {
  status?: string;
  closedDate?: string;
  user?: string;
  showGain: boolean;
};

export type ConversionRateGraphData = {
  columnId: number;
  columnTitle: string;
  columnType: string;
  quantityCards: number;
  totalValueCards: number;
  winCountCardsInStage: number | null;
  winAmountCardsInStage: number | null;
};

export interface IFindConversionRateGraphDataRepository {
  find(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<ConversionRateGraphData[]>;
}
