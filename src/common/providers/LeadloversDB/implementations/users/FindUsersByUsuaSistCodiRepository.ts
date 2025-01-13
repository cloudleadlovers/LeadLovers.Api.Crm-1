import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IFindUsersByUsuaSistCodiRepository,
  User
} from '../../models/users/IFindUsersByUsuaSistCodiRepository';

export class FindUsersByUsuaSistCodiRepository
  implements IFindUsersByUsuaSistCodiRepository
{
  async find(usuaSistCodi: number): Promise<User[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('UsuaSistCodi', mssql.Int, usuaSistCodi).query<User>(`
        SELECT 
          USA.AcesCodi AS id, 
          USA.AcesUsuaNome AS name,
          ISNULL(USA.AcesUsuaFoto, '/content/images/avatar-default.png') AS photo 
        FROM 
          UsuaSistAces USA WITH(NOLOCK) 
        WHERE 
          USA.UsuaSistCodi = @user 
          AND USA.AcesUsuaRemo = 0
          AND USA.AcesUsuaAtiv = 1
        ORDER BY 
          USA.AcesUsuaNome;
      `);
    return recordset;
  }
}
