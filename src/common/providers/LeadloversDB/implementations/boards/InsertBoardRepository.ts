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
      .input('UsuaSistCodi', mssql.Int, params.userId)
      .input('Title', mssql.NVarChar, params.title)
      .input('Goal', mssql.Int, params.goal)
      .input('Rule', mssql.NVarChar, params.rule)
      .input('Logo', mssql.NVarChar, params.logo).query<Board>(`
        INSERT INTO Pipeline_Board (
            UsuaSistCodi, 
            Title, 
            CreateDate, 
            Status, 
            Goal, 
            [Rule],
            Logo
        ) 
        OUTPUT 
            INSERTED.[Id] as id
        VALUES (
            @UsuaSistCodi, 
            @Title, 
            GETDATE(), 
            1, 
            @Goal, 
            @Rule,
            @Logo
        )
    `);
    return board[0].id;
  }
}
