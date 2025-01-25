import mssql from 'mssql';

import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  Funnel,
  IFindFunnelsByListCodiRepository
} from '../../models/funnels/IFindFunnelsByListCodiRepository';

export class FindFunnelsByListCodiRepository
  implements IFindFunnelsByListCodiRepository
{
  public async find(
    listCodi: number,
    pagination: Pagination
  ): Promise<ResultPaginated<Funnel>> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('ListCodi', mssql.Int, listCodi)
      .input('Limit', mssql.Int, pagination.limit)
      .input(
        'Offset',
        mssql.Int,
        pagination.lastId ? (pagination.lastId - 1) * pagination.limit : 0
      ).query<Funnel>(`
        SELECT
          LF.FuniCodi AS id,
          LF.FuniNome AS name
        FROM
          ListFuni LF WITH(NOLOCK)
        WHERE
          LF.ListCodi = @ListCodi
          AND ISNULL(LF.FuniAtiv, 1) = 1
          AND LF.FuniDataRemo IS NULL
        ORDER BY 
          LF.FuniNome ASC
        OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY;
      `);
    return {
      items: recordset,
      nextCursor: pagination.lastId ? pagination.lastId + 1 : undefined
    };
  }
}
