import mssql from 'mssql';

import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IFindLeadsByUsuaSistCodiRepository,
  Lead
} from '../../models/leads/IFindLeadsByUsuaSistCodiRepository';

export class FindLeadsByUsuaSistCodiRepository
  implements IFindLeadsByUsuaSistCodiRepository
{
  async list(
    usuaSistCodi: number,
    pagination: Pagination,
    leadName?: string
  ): Promise<ResultPaginated<Lead>> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('UsuaSistCodi', mssql.Int, usuaSistCodi)
      .input('Limit', mssql.Int, pagination.limit)
      .input(
        'Offset',
        mssql.Int,
        pagination.lastId ? (pagination.lastId - 1) * pagination.limit : 0
      )
      .query<Lead>(this.makeQuery(leadName));
    return {
      items: recordset,
      nextCursor: pagination.lastId ? pagination.lastId + 1 : undefined
    };
  }

  private makeQuery(leadName?: string): string {
    let query = `
      SELECT DISTINCT
        LU.LeadCodi AS id, 
        ISNULL(LU.LeadNome, '') AS name,
        ISNULL(LU.EmailLead, '') AS email, 
        ISNULL(LU.LeadFone, '') AS phone, 
        ISNULL(LU.LeadCidade, '') AS city, 
        ISNULL(LU.LeadEstado, '') AS state, 
        ISNULL(LU.LeadEmpresa, '') AS company, 
        LU.LeadUsuaSistDataCada AS createdAt 
      FROM 
        LeadUsuaSist LU WITH(NOLOCK)
      WHERE
        LU.UsuaSistCodi = @UsuaSistCodi 
        AND LU.LeadUsuaSistStatCodi = 1 
    `;

    if (leadName) {
      query += `AND LU.LeadNome LIKE '%${leadName}%'`;
    }

    query += `
      ORDER BY 
        CASE WHEN LU.LeadNome IS NULL THEN 0 ELSE 1 END ASC,
        LU.LeadNome ASC
    `;

    query += `
      OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY;
    `;

    return query;
  }
}
