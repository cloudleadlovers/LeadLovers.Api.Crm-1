import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IFindLeadUsuaSistByLeadCodiRepository } from '../../models/leadUsuaSists/IFindLeadUsuaSistByLeadCodiRepository';
import { LeadUsuaSist } from '../../models/leadUsuaSists/IFindLeadUsuaSistRepository';

export class FindLeadUsuaSistByLeadCodiRepository
  implements IFindLeadUsuaSistByLeadCodiRepository
{
  async find(
    leadCodi: number,
    usuaSistCodi: number
  ): Promise<LeadUsuaSist | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('LeadCodi', mssql.Int, leadCodi)
      .input('UsuaSistCodi', mssql.Int, usuaSistCodi).query<LeadUsuaSist>(`
          SELECT TOP 1
            LUS.LeadUsuaSistCodi AS id,
            LUS.LeadCodi AS leadCodi,
            ISNULL(LUS.EmailLead, '') AS leadEmail,
            ISNULL(LUS.LeadUsuaSistStatCodi, 0) AS statCodi
          FROM
            LeadUsuaSist LUS WITH(NOLOCK)
          WHERE
            LUS.LeadCodi = @LeadCodi
            AND LUS.UsuaSistCodi = @UsuaSistCodi;
        `);
    return recordset.length ? recordset[0] : undefined;
  }
}
