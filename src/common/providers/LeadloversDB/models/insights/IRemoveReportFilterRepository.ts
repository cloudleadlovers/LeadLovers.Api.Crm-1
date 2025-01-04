export interface IRemoveReportFilterRepository {
  remove(filterId: number): Promise<void>;
}
