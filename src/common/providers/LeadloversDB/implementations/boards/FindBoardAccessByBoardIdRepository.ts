import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  BoardAccess,
  IFindBoardAccessByBoardIdRepository
} from '../../models/boards/IFindBoardAccessByBoardIdRepository';

export class FindBoardAccessByBoardIdRepository
  implements IFindBoardAccessByBoardIdRepository
{
  public async find(boardId: number): Promise<BoardAccess[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId).query<BoardAccess>(`
        SELECT
          PBA.BoardId AS boardId,
          PBA.AcesCodi AS userId,
          USA.AcesUsuaNome AS userName,
          ISNULL(USA.AcesUsuaFoto, '/content/images/avatar-default.png') AS userPhoto,
          PBA.AccessType AS accessId
        FROM 
          Pipeline_Board_Access PBA WITH(NOLOCK)
        INNER JOIN
          UsuaSistAces USA WITH(NOLOCK) ON PBA.AcesCodi = USA.AcesCodi
        WHERE
          PBA.BoardId = @BoardId
          AND USA.AcesUsuaRemo = 0
          AND USA.AcesUsuaAtiv = 1;
      `);
    return recordset;
  }
}
