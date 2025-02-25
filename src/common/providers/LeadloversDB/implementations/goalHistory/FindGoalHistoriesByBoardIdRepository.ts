import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  GoalHistory,
  IFindGoalHistoriesByBoardIdRepository
} from '../../models/goalHistory/IFindGoalHistoriesByBoardIdRepository';

export class FindGoalHistoriesByBoardIdRepository
  implements IFindGoalHistoriesByBoardIdRepository
{
  public async find(boardId: number): Promise<GoalHistory[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId).query<GoalHistory>(`
        SELECT 
          * 
        FROM
          PipelineGoalHistory WITH(NOLOCK) 
        WHERE 
          boardId = @BoardId 
        ORDER BY 
          id DESC;
      `);

    return recordset;
  }
}
