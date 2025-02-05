import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IUpdateCardsByColumnIdRepository,
  UpdateCardsByColumnIdParams,
  UpdateCardsByColumnIdResponse
} from '../../models/cards/IUpdateCardsByColumnIdRepository';

export class UpdateCardsByColumnIdRepository
  implements IUpdateCardsByColumnIdRepository
{
  public async update(
    params: UpdateCardsByColumnIdParams
  ): Promise<UpdateCardsByColumnIdResponse[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('Status', mssql.Int, params.status)
      .input('AcesCodi', mssql.Int, params.responsibleId)
      .input('ColumnId', mssql.Int, params.columnId)
      .query<UpdateCardsByColumnIdResponse>(`
      UPDATE 
        Pipeline_Card
      SET 
        [Status] = @Status,
        [AcesCodi] = @AcesCodi
      OUTPUT 
        INSERTED.Id AS id,
        ISNULL(INSERTED.UsuaSistCodi, 0) AS usuaSistCodi,
        INSERTED.ColumnId AS columnId,
        ISNULL(INSERTED.LeadCodi, 0) AS leadCodi,
        ISNULL(INSERTED.LeadName, '') AS name,
        ISNULL(INSERTED.LeadEmail, '') AS email,
        ISNULL(INSERTED.LeadPhone, '') AS phone,
        ISNULL(INSERTED.LeadCommercialPhone, '') AS commercialPhone,
        ISNULL(INSERTED.LeadScore, '') AS score,
        ISNULL(INSERTED.LeadTags, '') AS tags,
        INSERTED.Status AS status,
        INSERTED.CardValue AS value,
        INSERTED.DealStatus AS dealStatus,
        INSERTED.DealScheduleDate AS dealScheduleDate,
        INSERTED.CardPosition AS position,
        INSERTED.CreateDate AS createdAt,
        ISNULL(INSERTED.AcesCodi, 0) AS responsibleId,
        DELETED.Status AS oldStatus,
        ISNULL(DELETED.AcesCodi, 0) AS oldResponsibleId
      WHERE
        ColumnId = @ColumnId;
    `);
    return recordset;
  }
}
