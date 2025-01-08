import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export interface IAverageDaysToCloseAnOpportunityRepository {
  average(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<number>;
}
