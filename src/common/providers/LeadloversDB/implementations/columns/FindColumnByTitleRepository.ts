import mssql from 'mssql';

import { ColumnStatus } from '@common/shared/enums/ColumnStatus';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IFindColumnByTitleRepository } from '../../models/columns/IFindColumnByTitleRepository';
import { Column } from '../../models/columns/IFindColumnRepository';

export class FindColumnByTitleRepository
  implements IFindColumnByTitleRepository
{
  public async find(
    boardId: number,
    title: string
  ): Promise<Pick<Column, 'id'> | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .input('Title', mssql.NVarChar, title)
      .input('Status', mssql.Int, ColumnStatus.ACTIVE).query<Column>(`
        SELECT
          Id AS id
        FROM
          Pipeline_Column WITH(NOLOCK) 
        WHERE
          BoardId = @BoardId
          AND Status = @Status
          AND Title = @Title  
      `);
    return recordset.length ? recordset[0] : undefined;
  }
}
