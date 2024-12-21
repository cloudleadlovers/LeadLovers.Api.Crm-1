import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export interface IAverageValueOfOpportunitiesWonRepository {
  average(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<number>;
}
