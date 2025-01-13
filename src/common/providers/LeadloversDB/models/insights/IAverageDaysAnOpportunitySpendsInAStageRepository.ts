import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type AverageDaysPerStage = {
  columnTitle: string;
  averageDealDuration: number;
  columnOrderNumber: number;
};

export interface IAverageDaysAnOpportunitySpendsInAStageRepository {
  average(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<AverageDaysPerStage[]>;
}
