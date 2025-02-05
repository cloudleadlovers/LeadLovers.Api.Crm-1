import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IDecrementsCardsPositionByColumnIdAndPositionRepository } from '../../models/cards/IDecrementsCardsPositionByColumnIdAndPositionRepository';
import { Column } from '../../models/columns/IFindColumnRepository';

export class DecrementsCardsPositionByColumnIdAndPositionRepository
  implements IDecrementsCardsPositionByColumnIdAndPositionRepository
{
  async decrements(columnId: number, position: number): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('ColumnId', mssql.Int, columnId)
      .input('@CardPosition', mssql.Int, position).query<Pick<Column, 'name'>>(`
        UPDATE 
          [Pipeline_Card] 
        SET 
          [CardPosition] = [CardPosition] - 1
        WHERE
          ColumnId = @ColumnId
          AND CardPosition > @CardPosition;
      `);
  }
}
