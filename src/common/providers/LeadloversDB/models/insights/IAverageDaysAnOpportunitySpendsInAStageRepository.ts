import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type AverageDaysPerStage = {
  stageTitle: string;
  averageDealDuration: number;
  stageOrderNumber: number;
};

export interface IAverageDaysAnOpportunitySpendsInAStageRepository {
  average(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<AverageDaysPerStage[]>;
}
