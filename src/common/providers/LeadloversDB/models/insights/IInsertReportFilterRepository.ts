import { PipelineReportsFilters } from './IFindConversionRateGraphDataRepository';

export interface IInsertReportFilterRepository {
  insert(
    usuaSistCodi: number,
    filterName: string,
    filters: PipelineReportsFilters
  ): Promise<number>;
}
