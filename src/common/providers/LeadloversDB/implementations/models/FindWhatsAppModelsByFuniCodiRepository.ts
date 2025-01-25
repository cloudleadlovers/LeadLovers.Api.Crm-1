import mssql from 'mssql';

import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IFindDefaultModelsByFuniCodiRepository,
  Model
} from '../../models/models/IFindDefaultModelsByFuniCodiRepository';

export class FindWhatsAppModelsByFuniCodiRepository
  implements IFindDefaultModelsByFuniCodiRepository
{
  public async find(
    funiCodi: number,
    pagination: Pagination
  ): Promise<ResultPaginated<Model>> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('FuniCodi', mssql.Int, funiCodi)
      .input('Limit', mssql.Int, pagination.limit)
      .input(
        'Offset',
        mssql.Int,
        pagination.lastId ? (pagination.lastId - 1) * pagination.limit : 0
      ).query<Model>(`
        SELECT
          M.ModeCodi AS id, 
          M.ModeNome AS name
        FROM 
          WhatsAppModelo M WITH(NOLOCK) 
        WHERE 
          M.FuniCodi = @FuniCodi 
          AND M.ModeSequ > 0 
          AND M.ModeAtiv = 1
        ORDER BY 
          M.ModeNome ASC
        OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY;
      `);
    return {
      items: recordset,
      nextCursor: pagination.lastId ? pagination.lastId + 1 : undefined
    };
  }
}
