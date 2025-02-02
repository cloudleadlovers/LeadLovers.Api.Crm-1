import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IInsertCardLayoutRepository,
  InsertCardLayoutParams
} from '../../models/cardLayouts/IInsertCardLayoutRepository';

export class InsertCardLayoutRepository implements IInsertCardLayoutRepository {
  async insert(params: InsertCardLayoutParams): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('BoardId', mssql.Int, params.boardId)
      .input('Layout', mssql.NVarChar, JSON.stringify(params.layout)).query(`
        INSERT INTO Pipeline_Board_Card_Layouts (
          BoardId,
          Layout
        ) 
        VALUES (
          @BoardId, 
          @Layout
        );
    `);
  }
}
