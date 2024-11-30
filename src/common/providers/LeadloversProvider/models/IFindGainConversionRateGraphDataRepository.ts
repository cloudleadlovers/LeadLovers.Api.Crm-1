import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type GainConversionRateGraphData = {
  stageType: string;
  quantityOpportunities: number;
  totalValueOpportunities: number;
};

export interface IFindGainConversionRateGraphDataRepository {
  find(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<GainConversionRateGraphData | undefined>;
}
