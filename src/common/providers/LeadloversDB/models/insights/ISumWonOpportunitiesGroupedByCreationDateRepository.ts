import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type SumWonOpportunities = {
  createdAt: Date;
  totalValueCards: number;
  totalCards: number;
};

export interface ISumWonOpportunitiesGroupedByCreationDateRepository {
  sum(
    boardId: number,
    initialDate: Date,
    endDate: Date,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<SumWonOpportunities[]>;
}
