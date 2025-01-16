import mssql from 'mssql';

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
      .input('Title', mssql.NVarChar, title).query<Column>(`
        SELECT
          PCL.Id AS id
        FROM
          Pipeline_Column PCL WITH(NOLOCK) 
        WHERE
          PCL.BoardId = @BoardId
          AND PCL.Status = 1
          AND PCL.Title = @Title  
      `);
    return recordset.length ? recordset[0] : undefined;
  }
}
