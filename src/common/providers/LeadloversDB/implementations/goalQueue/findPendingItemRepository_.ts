import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  GoalQueue,
  IFindPendingItemRepository
} from '@common/providers/LeadloversDB/models/goalQueue/IFindPendingItemRepository';

export class FindPendingItemRepository implements IFindPendingItemRepository {
  public async find(boardId: number): Promise<GoalQueue | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: pendingItem } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId).query<GoalQueue>(`
                SELECT 
                  * 
                FROM 
                  queueDb.dbo.crmGoalRecurrencyQueue WITH(NOLOCK) 
                WHERE 
                  boardId = @BoardId 
                AND 
                  [status] = 'PENDING'
              `);
    return pendingItem.length ? pendingItem[0] : undefined;
  }
}
