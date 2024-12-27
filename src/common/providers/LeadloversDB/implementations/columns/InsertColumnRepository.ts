import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IInsertColumnRepository } from '../../models/columns/IInsertColumnRepository';

export class InsertColumnRepository implements IInsertColumnRepository {
  async insert(boardId: number, title: string, order: number): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .input('Title', mssql.NVarChar, title)
      .input('Order', mssql.Int, order).query(`
        INSERT INTO Pipeline_Column (
            [BoardId], 
            [Title],
            [Description],
            [CreateDate],
            [Status],
            [ColumnDefaultValue],
            [Order]
        )
        VALUES (
            @BoardId,
            @Title,
            '',
            GETDATE(),
            1,
            0,
            @Order
        )
    `);
  }
}
