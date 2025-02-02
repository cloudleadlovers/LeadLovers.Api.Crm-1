import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IInsertBoardAccessRepository } from '../../models/boardAccess/IInsertBoardAccessRepository';

export class InsertBoardAccessRepository
  implements IInsertBoardAccessRepository
{
  async insert(
    boardId: number,
    responsibleId: number,
    roleId: number
  ): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .input('AcesCodi', mssql.Int, responsibleId)
      .input('AccessType', mssql.Int, roleId).query(`
        INSERT INTO Pipeline_Board_Access (
          BoardId,
          AcesCodi,
          AccessType
        ) 
        VALUES (
          @BoardId, 
          @AcesCodi,
          @AccessType
        );
      `);
  }
}
