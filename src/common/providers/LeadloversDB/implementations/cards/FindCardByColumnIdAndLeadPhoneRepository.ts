import mssql from 'mssql';

import { CardStatus } from '@common/shared/enums/CardStatus';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IFindCardByColumnIdAndLeadPhoneRepository } from '../../models/cards/IFindCardByColumnIdAndLeadPhoneRepository';

type Card = {
  leadCodi: number;
};

export class FindCardByColumnIdAndLeadPhoneRepository
  implements IFindCardByColumnIdAndLeadPhoneRepository
{
  async find(columnId: number, leadPhone: string): Promise<number | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: cards } = await pool
      .request()
      .input('ColumnId', mssql.Int, columnId)
      .input('LeadPhone', mssql.Int, leadPhone)
      .input('Status', mssql.Int, CardStatus.ACTIVE).query<Card>(`
        SELECT TOP 1 
          LeadCodi AS leadCodi
        FROM 
          [Pipeline_Card] PC WITH(NOLOCK) 
        WHERE 
          ColumnId = @ColumnId 
          AND LeadPhone = @LeadPhone 
          AND Status = @Status; 
      `);
    return cards.length ? cards[0].leadCodi : undefined;
  }
}
