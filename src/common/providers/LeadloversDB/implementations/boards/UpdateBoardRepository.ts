import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IUpdateBoardRepository,
  UpdateBoardParams
} from '../../models/boards/IUpdateBoardRepository';

export class UpdateBoardRepository implements IUpdateBoardRepository {
  public async update(params: UpdateBoardParams): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('Id', mssql.Int, params.boardId)
      .input('Logo', mssql.NVarChar, params.logo)
      .input('Title', mssql.NVarChar, params.title)
      .input('Goal', mssql.Int, params.goal)
      .input('GoalRecurrency', mssql.Int, params.goalRecurrency)
      .input('GoalRecurrencyStartIn', mssql.Date, params.goalRecurrencyStartIn)
      .input(
        'GoalRecurrencyFinishIn',
        mssql.Date,
        params.goalRecurrencyFinishIn
      ).query(`
        UPDATE 
           Pipeline_Board
        SET 
          [Logo] = @Logo,
          [Title] = @Title,
          [Goal] = @Goal,
          [GoalRecurrency] = @GoalRecurrency,
          [GoalRecurrencyStartIn] = @GoalRecurrencyStartIn,
          [GoalRecurrencyFinishIn] = @GoalRecurrencyFinishIn
        WHERE
          Id = @Id;
      `);
  }
}
