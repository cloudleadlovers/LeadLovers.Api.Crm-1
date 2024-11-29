import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type SumWonOpportunities = {
  creationDate: Date;
  opportunitiesValue: number;
  opportunitiesNumber: number;
};

export interface ISumWonOpportunitiesGroupedByCreationDateRepository {
  sum(
    boardId: number,
    initialDate: Date,
    endDate: Date,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<SumWonOpportunities[]>;
}
