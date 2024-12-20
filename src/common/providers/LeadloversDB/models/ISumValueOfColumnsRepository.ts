import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export type SumValueOfColumns = {
  columName: string;
  estimatedGoal: number;
  opportunitiesValue: number;
  orderNumber: number;
};

export interface ISumValueOfColumnsRepository {
  sum(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<SumValueOfColumns[]>;
}
