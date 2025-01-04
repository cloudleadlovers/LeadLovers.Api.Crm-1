import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export interface IUpdateReportFilterRepository {
  update(
    filterId: number,
    filterName?: string,
    filters?: PipelineReportsFilters
  ): Promise<void>;
}
