import mssql from 'mssql';

import { Pagination } from '@common/shared/types/Pagination';
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
  ): Promise<Lead[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('UsuaSistCodi', mssql.Int, usuaSistCodi)
      .input('Limit', mssql.Int, pagination.limit)
      .input('LastId', mssql.Int, pagination.lastId ?? null)
      .query<Lead>(this.makeQuery(leadName));
    return recordset;
  }

  private makeQuery(leadName?: string): string {
    let query = `
      SELECT DISTINCT TOP (@Limit)
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
        (@LastId IS NULL OR LU.LeadCodi < @LastId)
        AND LU.UsuaSistCodi = @UsuaSistCodi 
        AND LU.LeadUsuaSistStatCodi = 1 
    `;

    if (leadName) {
      query += `AND LU.LeadNome LIKE '%${leadName}%'`;
    }

    query += `
      ORDER BY 
        LU.LeadNome ASC;
    `;

    return query;
  }
}
