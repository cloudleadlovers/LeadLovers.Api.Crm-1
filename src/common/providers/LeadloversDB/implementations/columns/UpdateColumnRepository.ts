import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IUpdateColumnRepository,
  UpdateColumnParams
} from '../../models/columns/IUpdateColumnRepository';

export class UpdateColumnRepository implements IUpdateColumnRepository {
  async update(params: UpdateColumnParams): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('Title', mssql.NVarChar, params.title)
      .input('Color', mssql.NVarChar, params.color)
      .input('Status', mssql.Int, params.status)
      .input('ColumnDefaultValue', mssql.Int, params.value)
      .input('Order', mssql.Int, params.order)
      .input('BoardId', mssql.Int, params.boardId)
      .input('Id', mssql.Int, params.columnId).query(`
        UPDATE 
          [Pipeline_Column] 
        SET 
          [Title] = @Title,
          [Color] = @Color,
          [Status] = @Status, 
          [ColumnDefaultValue] = @ColumnDefaultValue,
          [Order] = @Order
        WHERE
          BoardId = @BoardId
          AND [Id] = @Id;
      `);
  }
}
