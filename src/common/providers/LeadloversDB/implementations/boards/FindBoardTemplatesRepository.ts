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
          B.Id AS boardId,
          B.Title AS boardTitle,
          C.Id AS columnId,
          C.Title AS columnTitle,
          C.Color AS columnColor,
          C.Order AS columnOrder
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
