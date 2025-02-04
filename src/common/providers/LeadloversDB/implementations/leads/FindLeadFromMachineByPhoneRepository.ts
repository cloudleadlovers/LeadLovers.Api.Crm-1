import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IFindLeadFromMachineByPhoneRepository } from '../../models/leads/IFindLeadFromMachineByPhoneRepository';
import { Lead } from '../../models/leads/IFindLeadsByUsuaSistCodiRepository';

export class FindLeadFromMachineByPhoneRepository
  implements IFindLeadFromMachineByPhoneRepository
{
  async find(
    machineId: number,
    funnelId: number,
    phone: string
  ): Promise<Pick<Lead, 'id'> | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('ListCodi', mssql.Int, machineId)
      .input('FuniCodi', mssql.Int, funnelId)
      .input('LeadFone', mssql.NVarChar, phone).query<Lead>(`
        SELECT TOP 1
          LL.LeadCodi AS id
        FROM
          ListLead LL WITH(NOLOCK)
        INNER JOIN
          LeadUsuaSist LUS WITH(NOLOCK) 
        ON 
          LL.LeadCodi = LUS.LeadCodi
          AND LUS.LeadFone = @LeadFone
        WHERE
          LL.ListCodi = @ListCodi
          AND LL.FuniCodi = @FuniCodi
        ORDER BY
          LUS.LeadUsuaSistDataCada DESC;
      `);
    return recordset.length ? recordset[0] : undefined;
  }
}
