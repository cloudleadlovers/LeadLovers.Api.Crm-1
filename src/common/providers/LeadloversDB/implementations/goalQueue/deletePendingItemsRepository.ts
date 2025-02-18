import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IDeletePendingItemsRepository } from '@common/providers/LeadloversDB/models/goalQueue/IDeletePendingItemsRepository';

export class DeletePendingItemsRepository
  implements IDeletePendingItemsRepository
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
