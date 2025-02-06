import mssql from 'mssql';

import { CardStatus } from '@common/shared/enums/CardStatus';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IUpdateCardRepository,
  UpdateCardParams,
  UpdateCardResponse
} from '../../models/cards/IUpdateCardRepository';

export class UpdateCardRepository implements IUpdateCardRepository {
  public async update(
    params: UpdateCardParams
  ): Promise<UpdateCardResponse | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('NewStatus', mssql.Int, params.status)
      .input('AcesCodi', mssql.Int, params.responsibleId)
      .input('ColumnId', mssql.Int, params.columnId)
      .input('Id', mssql.Int, params.cardId)
      .input('Status', mssql.Int, CardStatus.ACTIVE).query<UpdateCardResponse>(`
        UPDATE 
          Pipeline_Card
        SET 
          [Status] = @NewStatus,
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
          ColumnId = @ColumnId
          AND Id = @Id
          AND Status = @Status;
      `);
    return recordset.length ? recordset[0] : undefined;
  }
}
