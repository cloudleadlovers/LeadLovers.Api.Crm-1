import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IRemoveLeadFromBlackListRepository } from '../../models/leadBlackList/IRemoveLeadFromBlackListRepository';

export class RemoveLeadFromBlackListRepository
  implements IRemoveLeadFromBlackListRepository
{
  async remove(leadEmail: string): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('@email', mssql.NVarChar, leadEmail)
      .input('@observation', mssql.NVarChar, 'Cadastro manual de leads')
      .execute(`RemoveLeadBlackList`);
  }
}
