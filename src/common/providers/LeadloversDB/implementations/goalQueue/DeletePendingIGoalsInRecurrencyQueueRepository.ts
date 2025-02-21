import mssql from 'mssql';

import { IDeletePendingIGoalsInRecurrencyQueueRepository } from '@common/providers/LeadloversDB/models/goalQueue/IDeletePendingIGoalsInRecurrencyQueueRepository';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';

export class DeletePendingIGoalsInRecurrencyQueueRepository
  implements IDeletePendingIGoalsInRecurrencyQueueRepository
{
  public async delete(boardId: number): Promise<void> {
    const pool = await mssqlPoolConnect('queueDb');
    await pool.request().input('boardId', mssql.Int, boardId).query(`
      DELETE FROM 
        crmGoalRecurrencyQueue
      WHERE
        boardId = @boardId 
      AND 
        [status] = 'PENDING';
    `);
  }
}
