import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type GainConversionRateGraphData = {
  columnType: string;
  quantityCards: number;
  totalValueCards: number;
};

export interface IFindGainConversionRateGraphDataRepository {
  find(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<GainConversionRateGraphData | undefined>;
}
