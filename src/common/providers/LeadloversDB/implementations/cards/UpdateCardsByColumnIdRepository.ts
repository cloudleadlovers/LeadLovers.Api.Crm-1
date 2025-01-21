import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { Card } from '../../models/cards/IFindCardsByColumnIdRepository';
import {
  IUpdateCardsByColumnIdRepository,
  UpdateCardsParams
} from '../../models/cards/IUpdateCardsByColumnIdRepository';

export class UpdateCardsByColumnIdRepository
  implements IUpdateCardsByColumnIdRepository
{
  public async update(
    params: UpdateCardsParams
  ): Promise<Pick<Card, 'id' | 'name'>[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('Status', mssql.Int, params.status)
      .input('ColumnId', mssql.Int, params.columnId).query<
      Pick<Card, 'id' | 'name'>
    >(`
        UPDATE 
          Pipeline_Card
        SET 
          [Status] = @Status
        OUTPUT 
          INSERTED.Id AS id,
          INSERTED.LeadName AS name
        WHERE
          ColumnId = @ColumnId;
      `);
    return recordset;
  }
}
