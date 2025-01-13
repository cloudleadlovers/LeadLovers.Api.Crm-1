import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { PipelineReportsFilters } from '../../models/insights/IFindConversionRateGraphDataRepository';
import { IUpdateReportFilterRepository } from '../../models/insights/IUpdateReportFilterRepository';

export class UpdateReportFilterRepository
  implements IUpdateReportFilterRepository
{
  async update(
    filterId: number,
    filterName?: string,
    filters?: PipelineReportsFilters
  ): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('Id', mssql.Int, filterId)
      .input('ReportName', mssql.NVarChar, filterName)
      .input('FilterJson', mssql.NVarChar, JSON.stringify(filters)).query(`
        UPDATE 
          Pipeline_Reports 
        SET
          ReportName = @ReportName, 
          FilterJson = @FilterJson
        WHERE
          Id = @Id;
      `);
  }
}
