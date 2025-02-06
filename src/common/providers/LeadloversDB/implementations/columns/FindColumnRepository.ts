import mssql from 'mssql';

import { ColumnStatus } from '@common/shared/enums/ColumnStatus';
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
    const { recordset } = await pool
      .request()
      .input('Id', mssql.Int, columnId)
      .input('Status', mssql.Int, ColumnStatus.ACTIVE).query<Column>(`
        SELECT
          Id AS id,
          BoardId AS boardId,
          Title AS name,
          Color AS color,
          [Order] AS order,
          [Status] AS status,
          [ColumnDefaultValue] AS value,
          CreateDate AS createdAt
        FROM
          Pipeline_Column WITH(NOLOCK) 
        WHERE
          Id = @Id
          AND Status = @Status
      `);
    return recordset.length ? recordset[0] : undefined;
  }
}
