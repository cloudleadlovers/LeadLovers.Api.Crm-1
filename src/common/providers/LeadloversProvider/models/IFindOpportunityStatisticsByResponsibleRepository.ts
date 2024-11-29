import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type OpportunityStatisticsByResponsible = {
  responsibleName: string;
  valueOportunities: number;
  countWinOpportunities: number;
  winAmount: number;
  averageTimeToWinDays: number;
  totalOpportunities: number;
};

export interface IFindOpportunityStatisticsByResponsibleRepository {
  find(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<OpportunityStatisticsByResponsible[]>;
}
