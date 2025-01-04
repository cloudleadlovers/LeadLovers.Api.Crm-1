export type ReportFilter = {
  id: number;
  userId: number;
  name: string;
  filters: string;
  createdAt: Date;
};

export interface IFindReportFiltersByUsuaSistCodiRepository {
  find(usuaSistCodi: number): Promise<ReportFilter[]>;
}
