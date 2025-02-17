import mssql from 'mssql';

import { CardStatus } from '@common/shared/enums/CardStatus';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { ISortCardsRepository } from '../../models/cards/ISortCardsRepository';

export class SortCardsRepository implements ISortCardsRepository {
  public async sort(columnId: number): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('ColumnId', mssql.Int, columnId)
      .input('Status', mssql.Int, CardStatus.ACTIVE).query(`
        WITH OrderedCards AS (
            SELECT 
                Id,
                ROW_NUMBER() OVER (ORDER BY CardPosition) AS NewPosition
            FROM 
                Pipeline_Card WITH(NOLOCK)
            WHERE 
                ColumnId = @ColumnId
                AND Status = @Status
        )
        UPDATE 
            Pipeline_Card
        SET 
            CardPosition = OrderedCards.NewPosition
        FROM 
            Pipeline_Card
        JOIN OrderedCards ON Pipeline_Card.Id = OrderedCards.Id;
    `);
  }
}
