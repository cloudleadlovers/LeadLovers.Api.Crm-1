import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type GainConversionRateGraphData = {
  columnCards: number;
  columnAmount: number;
  columnType: string;
};

export interface IFindGainConversionRateGraphDataRepository {
  find(
    boardId: number,
    showGain: boolean,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<GainConversionRateGraphData | undefined>;
}
