import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  Board,
  IFindBoardRepository
} from '../../models/boards/IFindBoardRepository';

export class FindBoardRepository implements IFindBoardRepository {
  async find(
    boardId: number
  ): Promise<Omit<Board, 'cardQuantity' | 'totalCardValue'> | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool.request().input('Id', mssql.Int, boardId)
      .query<Board>(`
       SELECT 
        PB.[Id] AS id,
        PB.[UsuaSistCodi] AS userId,
        ISNULL(PB.[Logo], '') AS logo,
        PB.[Title] AS title,
        PB.[Description] AS description,
        ISNULL(PB.[Goal], 0) AS goal,
        ISNULL(PB.[GoalRecurrency], 0) AS goalRecurrency,
        GoalRecurrencyStartIn AS goalRecurrencyStartIn,
        GoalRecurrencyFinishIn AS goalRecurrencyFinishIn,
        ISNULL(PB.[Rule], 'all-crm') AS [rule],
        PB.[CreateDate] AS createdAt
      FROM 
        [Pipeline_Board] PB WITH(NOLOCK)
      WHERE 
        PB.[Id] = @Id
        AND PB.[Status] = 1;
    `);
    return recordset.length ? recordset[0] : undefined;
  }
}
