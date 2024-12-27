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
                UA.AcesCodi AS id, 
                UA.AcesUsuaNome AS name,
                ISNULL(UA.AcesUsuaFoto, '/content/images/avatar-default.png') AS photo 
            FROM 
                UsuaSistAces UA WITH(NOLOCK) 
            WHERE 
                UA.UsuaSistCodi = @user 
                AND UA.AcesUsuaRemo = 0
                AND UA.AcesUsuaAtiv = 1
            ORDER BY 
                UA.AcesUsuaNome;
        `);
    return recordset;
  }
}
