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
  stageId: number;
  stageTitle: string;
  stageType: string;
  quantityOpportunities: number;
  totalValueOpportunities: number;
  winCountOpportunitiesInStage: number | null;
  winAmountOpportunitiesInStage: number | null;
};

export interface IFindConversionRateGraphDataRepository {
  find(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<ConversionRateGraphData[]>;
}
