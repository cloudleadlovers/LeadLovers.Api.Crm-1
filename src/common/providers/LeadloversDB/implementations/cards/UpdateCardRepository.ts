import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IUpdateCardRepository,
  UpdateCardParams
} from '../../models/cards/IUpdateCardRepository';

export class UpdateCardRepository implements IUpdateCardRepository {
  public async update(params: UpdateCardParams): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('Status', mssql.Int, params.status)
      .input('ColumnId', mssql.Int, params.columnId)
      .input('Id', mssql.Int, params.cardId).query(`
        UPDATE 
          Pipeline_Card
        SET 
          [Status] = @Status
        WHERE
          ColumnId = @ColumnId
          AND Id = @Id;
      `);
  }
}
