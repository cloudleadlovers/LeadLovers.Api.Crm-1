import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type LostOpportunitie = {
  reason: string;
  count: number;
};

export interface ICountLostOpportunitiesRepository {
  count(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<LostOpportunitie[]>;
}
