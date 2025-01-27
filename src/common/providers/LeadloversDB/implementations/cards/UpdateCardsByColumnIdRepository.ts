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
  ): Promise<Omit<Card, 'gainedAt' | 'losedAt'>[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('Status', mssql.Int, params.status)
      .input('ColumnId', mssql.Int, params.columnId).query<
      Omit<Card, 'gainedAt' | 'losedAt'>
    >(`
      UPDATE 
        Pipeline_Card
      SET 
        [Status] = @Status
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
        ISNULL(INSERTED.AcesCodi, 0) AS responsibleId
      WHERE
        ColumnId = @ColumnId;
    `);
    return recordset;
  }
}
