import mssql from 'mssql';

import { ColumnStatus } from '@common/shared/enums/ColumnStatus';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { Column } from '../../models/columns/IFindColumnRepository';
import {
  IUpdateColumnRepository,
  UpdateColumnParams
} from '../../models/columns/IUpdateColumnRepository';

export class UpdateColumnRepository implements IUpdateColumnRepository {
  async update(
    params: UpdateColumnParams
  ): Promise<Pick<Column, 'name'> | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('Title', mssql.NVarChar, params.title)
      .input('Color', mssql.NVarChar, params.color)
      .input('NewStatus', mssql.Int, params.status)
      .input('ColumnDefaultValue', mssql.Int, params.value)
      .input('Order', mssql.Int, params.order)
      .input('BoardId', mssql.Int, params.boardId)
      .input('Id', mssql.Int, params.columnId)
      .input('Status', mssql.Int, ColumnStatus.ACTIVE).query<
      Pick<Column, 'name'>
    >(`
        UPDATE 
          [Pipeline_Column] 
        SET 
          [Title] = @Title,
          [Color] = @Color,
          [Status] = @NewStatus, 
          [ColumnDefaultValue] = @ColumnDefaultValue,
          [Order] = @Order
        OUTPUT 
          INSERTED.Title AS name
        WHERE
          BoardId = @BoardId
          AND [Id] = @Id
          AND Status = @Status;
      `);
    return recordset.length ? recordset[0] : undefined;
  }
}
