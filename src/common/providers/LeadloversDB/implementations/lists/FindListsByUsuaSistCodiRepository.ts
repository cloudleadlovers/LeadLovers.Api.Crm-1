import mssql from 'mssql';

import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IFindListsByUsuaSistCodiRepository,
  List
} from '../../models/lists/IFindListsByUsuaSistCodiRepository';

export class FindListsByUsuaSistCodiRepository
  implements IFindListsByUsuaSistCodiRepository
{
  public async find(
    usuaSistCodi: number,
    pagination: Pagination
  ): Promise<ResultPaginated<List>> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('UsuaSistCodi', mssql.Int, usuaSistCodi)
      .input('Limit', mssql.Int, pagination.limit)
      .input(
        'Offset',
        mssql.Int,
        pagination.lastId ? (pagination.lastId - 1) * pagination.limit : 0
      ).query<List>(`
        SELECT
          L.ListCodi AS id,
          L.ListName AS name
        FROM
          List L WITH(NOLOCK)
        WHERE
          L.UsuaSistCodi = @UsuaSistCodi
          AND L.ListStat = 1
        ORDER BY 
          L.ListName ASC
        OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY;
      `);
    return {
      items: recordset,
      nextCursor: pagination.lastId ? pagination.lastId + 1 : undefined
    };
  }
}
