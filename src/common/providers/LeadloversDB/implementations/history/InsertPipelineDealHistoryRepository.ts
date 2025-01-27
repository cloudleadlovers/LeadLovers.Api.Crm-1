import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IInsertPipelineDealHistoryRepository,
  InsertPipelineDealHistoryParams
} from '../../models/history/IInsertPipelineDealHistoryRepository';

export class InsertPipelineDealHistoryRepository
  implements IInsertPipelineDealHistoryRepository
{
  async insert(params: InsertPipelineDealHistoryParams): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('historyTypeId', mssql.Int, params.type ?? -1)
      .input('dealId', mssql.BigInt, params.dealId ?? -1)
      .input('columnSourceId', mssql.Int, params.columnSourceId ?? -1)
      .input('columnDestinationId', mssql.Int, params.columnDestinationId ?? -1)
      .input('dealDataBefore', mssql.NVarChar, params.dealDataBefore ?? null)
      .input('dealDataAfter', mssql.NVarChar, params.dealDataAfter ?? null)
      .input('annotationId', mssql.Int, params.annotationId ?? -1)
      .input('createdBy', mssql.Int, params.usuaSistCodi)
      .input('createdBySubUser', mssql.Int, params.acesCodi ?? null).query(`
        INSERT INTO [pipelineDealHistory] (
          [historyTypeId],
          [dealId],
          [columnSourceId],
          [columnDestinationId],
          [dealDataBefore],
          [dealDataAfter],
          [annotationId],
          [createdBy],
          [createdBySubUser],
          [createdAt]    
        ) 
        VALUES (
          @historyTypeId,
          @dealId,
          @columnSourceId,
          @columnDestinationId,
          @dealDataBefore,
          @dealDataAfter,
          @annotationId,
          @createdBy,
          @createdBySubUser, 
          GETDATE()
        );
      `);
  }
}
