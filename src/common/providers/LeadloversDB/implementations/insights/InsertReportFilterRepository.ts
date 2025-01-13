import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { PipelineReportsFilters } from '../../models/insights/IFindConversionRateGraphDataRepository';
import { IInsertReportFilterRepository } from '../../models/insights/IInsertReportFilterRepository';

type ReportFilter = {
  id: number;
};

export class InsertReportFilterRepository
  implements IInsertReportFilterRepository
{
  async insert(
    usuaSistCodi: number,
    filterName: string,
    filters: PipelineReportsFilters
  ): Promise<number> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: filter } = await pool
      .request()
      .input('UsuaSistCodi', mssql.Int, usuaSistCodi)
      .input('ReportName', mssql.NVarChar, filterName)
      .input('FilterJson', mssql.NVarChar, JSON.stringify(filters))
      .query<ReportFilter>(`
        INSERT INTO Pipeline_Reports (
          ReportDataCada, 
          ReportName, 
          FilterJson, 
          UsuaSistCodi
        ) 
        OUTPUT 
          INSERTED.[Id] AS id
        VALUES (
          GETDATE(), 
          @ReportName, 
          @FilterJson, 
          @UsuaSistCodi
        )
      `);
    return filter.length ? filter[0].id : 0;
  }
}
