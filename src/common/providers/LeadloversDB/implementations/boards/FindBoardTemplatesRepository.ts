import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  BoardTemplate,
  IFindBoardTemplatesRepository
} from '../../models/boards/IFindBoardTemplatesRepository';

export class FindBoardTemplatesRepository
  implements IFindBoardTemplatesRepository
{
  async find(): Promise<BoardTemplate[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool.request().query<BoardTemplate>(`
        SELECT 
          B.BoardId AS boardId,
          B.BoardTitle AS boardTitle,
          C.ColumnId AS columnId,
          C.ColumnTitle AS columnTitle,
          C.ColumnColor AS columnColor,
          C.ColumnOrder AS columnOrder
        FROM
            Pipeline_Board B WITH (NOLOCK)
        INNER JOIN
            Pipeline_Column C WITH (NOLOCK)
        ON
            C.BoardId = B.Id
            AND C.Status = 1
        WHERE
            B.Id IN (1,2,3);
        `);
    return recordset;
  }
}
