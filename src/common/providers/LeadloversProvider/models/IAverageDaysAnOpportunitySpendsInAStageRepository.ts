import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type AverageDays = {
  title: string;
  averageDays: number;
  orderNumber: number;
};

export interface IAverageDaysAnOpportunitySpendsInAStageRepository {
  average(
    boardId: number,
    days: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<AverageDays[]>;
}
