import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IFindCardByBoardIdAndLeadCodiRepository } from '../../models/cards/IFindCardByBoardIdAndLeadCodiRepository';

type Card = {
  leadCodi: number;
};

export class FindCardByBoardIdAndLeadCodiRepository
  implements IFindCardByBoardIdAndLeadCodiRepository
{
  async find(boardId: number, leadCodi: number): Promise<number | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: cards } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .input('LeadCodi', mssql.Int, leadCodi).query<Card>(`
        SELECT TOP 1
          PC.LeadCodi AS leadCodi
        FROM 
          [Pipeline_Card] PC WITH (NOLOCK)
        INNER JOIN [
          Pipeline_Column] PCL WITH (NOLOCK) ON  PCL.Id = PC.ColumnId
        INNER JOIN 
          [Pipeline_Board] PB WITH (NOLOCK) ON  PB.Id = PCL.BoardId
        WHERE 
          PB.Id = @BoardId
          AND PC.LeadCodi = @LeadCodi
          AND PC.Status = 1;
      `);
    return cards.length ? cards[0].leadCodi : undefined;
  }
}
