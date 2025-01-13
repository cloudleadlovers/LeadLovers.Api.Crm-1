import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type OpportunityStatisticsByResponsible = {
  responsibleName: string;
  valueCards: number;
  countWinCards: number;
  winAmount: number;
  averageTimeToWinDays: number;
  totalCards: number;
};

export interface IFindOpportunityStatisticsByResponsibleRepository {
  find(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<OpportunityStatisticsByResponsible[]>;
}
