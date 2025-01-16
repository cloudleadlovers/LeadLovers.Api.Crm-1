import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IInsertColumnRepository } from '../../models/columns/IInsertColumnRepository';

type Column = {
  id: number;
};

export class InsertColumnRepository implements IInsertColumnRepository {
  async insert(
    boardId: number,
    title: string,
    order: number,
    color: string
  ): Promise<number> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .input('Title', mssql.NVarChar, title)
      .input('Order', mssql.Int, order)
      .input('Color', mssql.NVarChar, color).query<Column>(`
        INSERT INTO Pipeline_Column (
          [BoardId], 
          [Title],
          [Description],
          [CreateDate],
          [Status],
          [ColumnDefaultValue],
          [Order],
          [Color]
        )
        OUTPUT 
          INSERTED.[Id] as id
        VALUES (
          @BoardId,
          @Title,
          '',
          GETDATE(),
          1,
          0,
          @Order,
          @Color
        )
      `);
    return recordset[0].id;
  }
}
