import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export interface IInsertReportFilterRepository {
  insert(
    userId: number,
    filterName: string,
    filters: PipelineReportsFilters
  ): Promise<number>;
}
