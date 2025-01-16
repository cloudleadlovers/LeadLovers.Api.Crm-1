import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IInsertPipelineHistoryRepository,
  InsertPipelineHistoryParams
} from '../../models/history/IInsertPipelineHistoryRepository';

export class InsertPipelineHistoryRepository
  implements IInsertPipelineHistoryRepository
{
  async insert(params: InsertPipelineHistoryParams): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('GroupId', mssql.Int, params.groupId ?? -1)
      .input('BoardId', mssql.Int, params.boardId ?? -1)
      .input('ColumnId', mssql.Int, params.columnId ?? -1)
      .input('CardId', mssql.Int, params.cardId ?? -1)
      .input('UsuaSistCodi', mssql.Int, params.usuaSistCodi)
      .input('AcesCodi', mssql.Int, params.acesCodi ?? null)
      .input('HistoryType', mssql.TinyInt, params.type)
      .input('HistoryData', mssql.NVarChar, params.data).query(`
        INSERT INTO [Pipeline_History] (
          [GroupId], 
          [BoardId], 
          [ColumnId], 
          [CardId], 
          [UsuaSistCodi], 
          [AcesCodi], 
          [HistoryType], 
          [HistoryDate], 
          [HistoryData], 
          [ObjectBefore]
        ) 
        VALUES (
          @GroupId, 
          @BoardId, 
          @ColumnId, 
          @CardId, 
          @UsuaSistCodi, 
          @AcesCodi, 
          @HistoryType, 
          GETDATE(), 
          @HistoryData, 
          ''
        )
      `);
  }
}
