import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IFindReportFiltersByUsuaSistCodiRepository,
  ReportFilter
} from '../../models/insights/IFindReportFiltersByUsuaSistCodiRepository';

export class FindReportFiltersByUsuaSistCodiRepository
  implements IFindReportFiltersByUsuaSistCodiRepository
{
  async find(usuaSistCodi: number): Promise<ReportFilter[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('UsuaSistCodi', mssql.Int, usuaSistCodi).query<ReportFilter>(`
        SELECT 
          Id AS id,
          UsuaSistCodi AS userId,
          ReportName AS name,
          FilterJson AS filters,
          ReportDataCada AS createdAt
        FROM 
          Pipeline_Reports WITH(NOLOCK)
        WHERE 
          UsuaSistCodi = @UsuaSistCodi
      `);
    return recordset;
  }
}
