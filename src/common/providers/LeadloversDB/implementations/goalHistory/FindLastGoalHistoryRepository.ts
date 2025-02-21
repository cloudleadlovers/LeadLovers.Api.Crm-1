import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  GoalHistory,
  IFindLastGoalHistoryRepository
} from '../../models/goalHistory/IFindLastGoalHistoryRepository';

export class FindLastGoalHistoryRepository
  implements IFindLastGoalHistoryRepository
{
  public async find(boardId: number): Promise<GoalHistory | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: lastItem } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId).query<GoalHistory>(`
        SELECT TOP 1 
          * 
        FROM
          PipelineGoalHistory WITH(NOLOCK) 
        WHERE 
          boardId = @BoardId 
        ORDER BY 
          id DESC;
      `);
    return lastItem.length ? lastItem[0] : undefined;
  }
}
