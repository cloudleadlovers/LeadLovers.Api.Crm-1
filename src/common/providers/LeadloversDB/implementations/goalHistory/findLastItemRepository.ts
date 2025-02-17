import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IFindLastItemRepository,
  GoalHistory
} from '../../models/goalHistory/IFindLastItemRepository';

export class FindLastItemRepository implements IFindLastItemRepository {
  public async find(boardId: number): Promise<GoalHistory | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: lastItem } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId).query<GoalHistory>(`
                SELECT TOP 1 
                    * 
                FROM
                    leadlovers.dbo.PipelineGoalHistory WITH(NOLOCK) 
                WHERE 
                    boardId = @BoardId 
                ORDER BY 
                    id DESC;`);
    return lastItem.length ? lastItem[0] : undefined;
  }
}
