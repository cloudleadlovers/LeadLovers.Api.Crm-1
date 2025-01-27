import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { Card } from '../../models/cards/IFindCardsByColumnIdRepository';
import {
  IInsertCardRepository,
  InsertCardParams
} from '../../models/cards/IInsertCardRepository';

export class InsertCardRepository implements IInsertCardRepository {
  async insert(
    params: InsertCardParams
  ): Promise<Pick<Card, 'id' | 'position' | 'createdAt'>> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: card } = await pool
      .request()
      .input('UsuaSistCodi', mssql.Int, params.usuaSistCodi)
      .input('ColumnId', mssql.Int, params.columnId)
      .input('LeadCodi', mssql.Int, params.leadCodi)
      .input('LeadEmail', mssql.NVarChar, params.leadEmail)
      .input('LeadName', mssql.NVarChar, params.leadName)
      .input('LeadPhone', mssql.NVarChar, params.leadPhone)
      .input('LeadCommercialPhone', mssql.NVarChar, params.leadCommercialPhone)
      .input('LeadScore', mssql.Int, params.leadScore ?? 0)
      .input('LeadTags', mssql.NVarChar, params.leadTags)
      .input('CardValue', mssql.Decimal, params.value ?? 0)
      .input('DealStatus', mssql.TinyInt, params.dealStatus)
      .input('DealScheduleDate', mssql.DateTime, params.dealScheduleDate)
      .input('Notifications', mssql.Bit, params.notifications ?? 0)
      .input('AcesCodi', mssql.Int, params.acesCodi).query<
      Pick<Card, 'id' | 'position' | 'createdAt'>
    >(`
        INSERT INTO [Pipeline_Card] (
          [UsuaSistCodi],
          [ColumnId],
          [LeadCodi],
          [LeadEmail],
          [LeadName],
          [LeadPhone],
          [LeadCommercialPhone],
          [LeadScore],
          [LeadTags],
          [Status],
          [CardValue],
          [DealStatus],
          [DealScheduleDate],
          [CardPosition],
          [Notifications],
          [AcesCodi],
          [CreateDate]
        )
        OUTPUT 
          INSERTED.[Id] AS id,
          INSERTED.[CardPosition] AS position,
          INSERTED.[CreateDate] AS createdAt
        VALUES (
          @UsuaSistCodi,
          @ColumnId,
          @LeadCodi,
          @LeadEmail,
          @LeadName,
          @LeadPhone,
          @LeadCommercialPhone,
          @LeadScore,
          @LeadTags,
          1,
          @CardValue,
          @DealStatus,
          @DealScheduleDate,
          ISNULL(
            (
              SELECT 
                MAX(CardPosition) + 1 
              FROM 
                Pipeline_Card WITH(NOLOCK) 
              WHERE 
                ColumnId = @ColumnId
            ), 0
          ),
          @Notifications,
          @AcesCodi,
          GETDATE()
        );
      `);
    return {
      id: card[0].id,
      position: card[0].position,
      createdAt: card[0].createdAt
    };
  }
}
