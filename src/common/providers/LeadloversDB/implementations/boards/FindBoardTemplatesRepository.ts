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
        PB.Id AS boardId,
        PB.Title AS boardTitle,
        PCL.Id AS columnId,
        PCL.Title AS columnTitle,
        PCL.Color AS columnColor,
        PCL.[Order] AS columnOrder
      FROM
        Pipeline_Board PB WITH(NOLOCK)
      INNER JOIN
        Pipeline_Column PCL WITH(NOLOCK)
      ON
        PCL.BoardId = PB.Id
        AND PCL.Status = 1
      WHERE
        PB.Id IN (1,2,3);
    `);
    return recordset;
  }
}
