import mssql from 'mssql';

import {
  GoalnRecurrencyQueue,
  IFindPendingGoalInRecurrencyQueueRepository
} from '@common/providers/LeadloversDB/models/goalQueue/IFindPendingGoalInRecurrencyQueueRepository';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';

export class FindPendingGoalInRecurrencyQueueRepository
  implements IFindPendingGoalInRecurrencyQueueRepository
{
  public async find(
    boardId: number
  ): Promise<GoalnRecurrencyQueue | undefined> {
    const pool = await mssqlPoolConnect('queueDb');
    const { recordset: pendingItem } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId).query<GoalnRecurrencyQueue>(`
        SELECT 
          * 
        FROM 
          crmGoalRecurrencyQueue WITH(NOLOCK) 
        WHERE 
          boardId = @BoardId 
          AND [status] = 'PENDING'
      `);
    return pendingItem.length ? pendingItem[0] : undefined;
  }
}
