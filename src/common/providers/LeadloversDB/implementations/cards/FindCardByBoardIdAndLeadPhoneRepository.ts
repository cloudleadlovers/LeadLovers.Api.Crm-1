import mssql from 'mssql';

import { CardStatus } from '@common/shared/enums/CardStatus';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IFindCardByBoardIdAndLeadPhoneRepository } from '../../models/cards/IFindCardByBoardIdAndLeadPhoneRepository';

type Card = {
  leadCodi: number;
};

export class FindCardByBoardIdAndLeadPhoneRepository
  implements IFindCardByBoardIdAndLeadPhoneRepository
{
  async find(boardId: number, leadPhone: string): Promise<number | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: cards } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .input('LeadPhone', mssql.Int, leadPhone)
      .input('Status', mssql.Int, CardStatus.ACTIVE).query<Card>(`
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
          AND PC.LeadPhone = @LeadPhone
          AND PC.Status = @Status;
      `);
    return cards.length ? cards[0].leadCodi : undefined;
  }
}
