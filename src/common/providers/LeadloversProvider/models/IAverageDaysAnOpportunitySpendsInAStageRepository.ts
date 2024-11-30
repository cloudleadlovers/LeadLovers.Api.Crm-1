import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type AverageDays = {
  stageTitle: string;
  averageDealDuration: number;
  stageOrderNumber: number;
};

export interface IAverageDaysAnOpportunitySpendsInAStageRepository {
  average(
    boardId: number,
    days: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<AverageDays[]>;
}
