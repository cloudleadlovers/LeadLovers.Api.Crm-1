import mssql from 'mssql';

import { CardStatus } from '@common/shared/enums/CardStatus';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IFindCardByColumnIdAndLeadCodiRepository } from '../../models/cards/IFindCardByColumnIdAndLeadCodiRepository';

type Card = {
  leadCodi: number;
};

export class FindCardByColumnIdAndLeadCodiRepository
  implements IFindCardByColumnIdAndLeadCodiRepository
{
  async find(columnId: number, leadCodi: number): Promise<number | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: cards } = await pool
      .request()
      .input('ColumnId', mssql.Int, columnId)
      .input('LeadCodi', mssql.Int, leadCodi)
      .input('Status', mssql.Int, CardStatus.ACTIVE).query<Card>(`
        SELECT TOP 1 
          LeadCodi AS leadCodi
        FROM 
          [Pipeline_Card] PC WITH (NOLOCK) 
        WHERE 
          ColumnId = @ColumnId 
          AND LeadCodi = @LeadCodi 
          AND Status = @Status; 
      `);
    return cards.length ? cards[0].leadCodi : undefined;
  }
}
