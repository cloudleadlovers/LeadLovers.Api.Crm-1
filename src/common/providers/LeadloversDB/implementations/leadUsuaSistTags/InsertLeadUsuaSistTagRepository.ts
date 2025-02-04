import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IInsertLeadUsuaSistTagRepository } from '../../models/leadUsuaSistTags/IInsertLeadUsuaSistTagRepository';

export class InsertLeadUsuaSistTagRepository
  implements IInsertLeadUsuaSistTagRepository
{
  async insert(leadUsuaSistCodi: number, tagId: number): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('LeadUsuaSistCodi', mssql.Int, leadUsuaSistCodi)
      .input('TagId', mssql.Int, tagId).query<{
      tagId: number;
    }>(`
        INSERT INTO LeadUsuaSistTag(
            LeadTagData,
            LeadUsuaSistCodi,
            TagId
        ) VALUES(
            GETDATE(),
            @LeadUsuaSistCodi,
            @TagId
        );
    `);
  }
}
