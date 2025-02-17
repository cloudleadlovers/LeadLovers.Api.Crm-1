import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IInsertGoalQueueRepository,
  InsertGoalQueueParams
} from '../../models/goalQueue/IInsertGoalQueueRepository';

export class InsertGoalQueueRepository implements IInsertGoalQueueRepository {
  public async insert(params: InsertGoalQueueParams): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('UserId', mssql.Int, params.userId)
      .input('BoardId', mssql.Int, params.boardId)
      .input('VerifyIn', mssql.Date, params.verifyIn).query(`
                INSERT INTO 
                    queueDb.dbo.crmGoalRecurrencyQueue (userId, boardId, verifyIn) 
                VALUES 
                    (@UserId, @BoardId, @VerifyIn);
              `);
  }
}
