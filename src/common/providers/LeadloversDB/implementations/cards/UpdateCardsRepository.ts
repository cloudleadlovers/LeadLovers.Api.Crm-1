import mssql from 'mssql';

import { CardStatus } from '@common/shared/enums/CardStatus';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IUpdateCardsRepository,
  UpdateCardsParams,
  UpdateCardsResponse
} from '../../models/cards/IUpdateCardsRepository';

export class UpdateCardsRepository implements IUpdateCardsRepository {
  public async update(
    params: UpdateCardsParams
  ): Promise<UpdateCardsResponse[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('AcesCodi', mssql.Int, params.responsibleId)
      .input('NewColumnId', mssql.Int, params.columnId)
      .input('NewPosition', mssql.Int, params.position)
      .input('NewStatus', mssql.Int, params.status)
      .input('Status', mssql.Int, CardStatus.ACTIVE)
      .query<UpdateCardsResponse>(this.makeQuery(params));
    return recordset;
  }

  private makeQuery(params: UpdateCardsParams): string {
    let query = `
        UPDATE 
          Pipeline_Card
        SET
            [AcesCodi] = @AcesCodi,
    `;
    if (params.setSequencialPosition && params.columnId) {
      query += `
            [CardPosition] = ISNULL(
              (
                SELECT 
                  COUNT(*)
                FROM 
                  Pipeline_Card PC WITH(NOLOCK) 
                WHERE 
                  PC.ColumnId = @NewColumnId
                  AND PC.CardPosition <= Pipeline_Card.CardPosition
                  AND PC.Status = @Status
              ), 0
            ),
      `;
    }
    if (!params.setSequencialPosition) {
      query += `
            [CardPosition] = @NewPosition,
      `;
    }
    query += `
            [ColumnId] = @NewColumnId,
            [Status] = @NewStatus
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
            DELETED.ColumnId AS oldColumnId,
            DELETED.CardPosition AS oldPosition,
            ISNULL(DELETED.AcesCodi, 0) AS oldResponsibleId,
            DELETED.Status AS oldStatus
        WHERE
            Id IN (${params.cardIds})
            AND Status = @Status;
    `;
    return query;
  }
}
