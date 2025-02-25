import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IUpdateGoalRecurrencyVerifyDateRepository } from '../../models/goalQueue/IUpdateGoalRecurrencyVerifyDateRepository';

export class UpdateGoalRecurrencyVerifyDateRepository
  implements IUpdateGoalRecurrencyVerifyDateRepository
{
  public async update(id: number, verifyIn: Date): Promise<void> {
    const pool = await mssqlPoolConnect('queueDb');
    await pool
      .request()
      .input('Id', mssql.Int, id)
      .input('VerifyIn', mssql.Date, verifyIn).query(`
        UPDATE 
          crmGoalRecurrencyQueue 
        SET
          verifyIn = @VerifyIn, 
          updatedAt = GETDATE() 
        WHERE 
          id = @Id;
      `);
  }
}
