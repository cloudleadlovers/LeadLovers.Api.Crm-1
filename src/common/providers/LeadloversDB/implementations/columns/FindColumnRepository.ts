import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  Column,
  IFindColumnRepository
} from '../../models/columns/IFindColumnRepository';

export class FindColumnRepository implements IFindColumnRepository {
  public async find(
    columnId: number
  ): Promise<Omit<Column, 'amountCards' | 'earnedRevenue'> | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool.request().input('Id', mssql.Int, columnId)
      .query<Column>(`
        SELECT
            PCL.Id AS id,
            PCL.BoardId AS boardId,
            PCL.Title AS name,
            PCL.Color AS color,
            PCL.[Order] AS order,
            PCL.[Status] AS status,
            PCL.[ColumnDefaultValue] AS value,
            PCL.CreateDate AS createdAt
        FROM
          Pipeline_Column PCL WITH(NOLOCK) 
        WHERE
          PCL.Id = @Id
      `);
    return recordset.length ? recordset[0] : undefined;
  }
}
