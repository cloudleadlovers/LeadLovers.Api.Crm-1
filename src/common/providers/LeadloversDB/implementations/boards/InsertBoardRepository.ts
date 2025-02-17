import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IInsertBoardRepository,
  InsertBoardParams
} from '../../models/boards/IInsertBoardRepository';

type Board = {
  id: number;
};

export class InsertBoardRepository implements IInsertBoardRepository {
  async insert(params: InsertBoardParams): Promise<number> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: board } = await pool
      .request()
      .input('UsuaSistCodi', mssql.Int, params.usuaSistCodi)
      .input('Title', mssql.NVarChar, params.title)
      .input('Description', mssql.NVarChar, params.description)
      .input('Goal', mssql.Int, params.goal)
      .input('GoalRecurrency', mssql.Int, params.goalRecurrency)
      .input('GoalRecurrencyStartIn', mssql.Date, params.goalRecurrencyStartIn)
      .input(
        'GoalRecurrencyFinishIn',
        mssql.Date,
        params.goalRecurrencyFinishIn
      )
      .input('Rule', mssql.NVarChar, params.rule)
      .input('Logo', mssql.NVarChar, params.logo).query<Board>(`
        INSERT INTO Pipeline_Board (
          UsuaSistCodi, 
          Title,
          Description,
          CreateDate, 
          Status, 
          Goal, 
          GoalRecurrency,
          GoalRecurrencyStartIn,
          GoalRecurrencyFinishIn,
          [Rule],
          Logo
        ) 
        OUTPUT 
          INSERTED.[Id] as id
        VALUES (
          @UsuaSistCodi, 
          @Title, 
          @Description,
          GETDATE(), 
          1, 
          @Goal, 
          @GoalRecurrency,
          @GoalRecurrencyStartIn,
          @GoalRecurrencyFinishIn,
          @Rule,
          @Logo
        )
      `);
    return board[0].id;
  }
}
