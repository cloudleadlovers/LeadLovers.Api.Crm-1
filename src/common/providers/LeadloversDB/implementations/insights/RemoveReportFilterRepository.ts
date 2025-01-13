import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IRemoveReportFilterRepository } from '../../models/insights/IRemoveReportFilterRepository';

export class RemoveReportFilterRepository
  implements IRemoveReportFilterRepository
{
  async remove(filterId: number): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool.request().input('Id', mssql.Int, filterId).query(`
      REMOVE FROM 
        Pipeline_Reports
      WHERE
        Id = @Id
    `);
  }
}
