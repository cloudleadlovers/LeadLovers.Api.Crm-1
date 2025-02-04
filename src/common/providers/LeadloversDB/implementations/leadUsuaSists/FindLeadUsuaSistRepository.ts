import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IFindLeadUsuaSistRepository,
  LeadUsuaSist
} from '../../models/leadUsuaSists/IFindLeadUsuaSistRepository';

export class FindLeadUsuaSistRepository implements IFindLeadUsuaSistRepository {
  async find(leadUsuaSistCodi: number): Promise<LeadUsuaSist | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('LeadUsuaSistCodi', mssql.Int, leadUsuaSistCodi)
      .query<LeadUsuaSist>(`
          SELECT TOP 1
            LUS.LeadUsuaSistCodi AS id,
            LUS.LeadCodi AS leadCodi,
            ISNULL(LUS.EmailLead, '') AS leadEmail,
            ISNULL(LUS.LeadUsuaSistStatCodi, 0) AS statCodi
          FROM
            LeadUsuaSist LUS WITH(NOLOCK)
          WHERE
            LUS.LeadUsuaSistCodi = @LeadUsuaSistCodi;
        `);
    return recordset.length ? recordset[0] : undefined;
  }
}
