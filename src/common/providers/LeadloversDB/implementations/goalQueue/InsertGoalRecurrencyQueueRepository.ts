import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IInsertGoalRecurrencyQueueRepository,
  InsertGoalRecurrencyQueueParams
} from '../../models/goalQueue/IInsertGoalRecurrencyQueueRepository';

export class InsertGoalRecurrencyQueueRepository
  implements IInsertGoalRecurrencyQueueRepository
{
  public async insert(params: InsertGoalRecurrencyQueueParams): Promise<void> {
    const pool = await mssqlPoolConnect('queueDb');
    await pool
      .request()
      .input('UserId', mssql.Int, params.userId)
      .input('BoardId', mssql.Int, params.boardId)
      .input('VerifyIn', mssql.Date, params.verifyIn).query(`
        INSERT INTO 
          crmGoalRecurrencyQueue (userId, boardId, verifyIn) 
        VALUES 
          (@UserId, @BoardId, @VerifyIn);
      `);
  }
}
