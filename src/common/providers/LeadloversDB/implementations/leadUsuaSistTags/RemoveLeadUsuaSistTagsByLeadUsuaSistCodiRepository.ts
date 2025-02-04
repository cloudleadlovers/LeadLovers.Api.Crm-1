import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IRemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository } from '../../models/leadUsuaSistTags/IRemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository';

export class RemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository
  implements IRemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository
{
  async remove(leadUsuaSistCodi: number): Promise<{ tagId: number }[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('LeadUsuaSistCodi', mssql.Int, leadUsuaSistCodi).query<{
      tagId: number;
    }>(`
        DELETE 
            LeadUsuaSistTag 
        OUTPUT 
            deleted.TagId AS tagId 
        WHERE 
            LeadUsuaSistCodi = @LeadUsuaSistCodi;
    `);
    return recordset;
  }
}
