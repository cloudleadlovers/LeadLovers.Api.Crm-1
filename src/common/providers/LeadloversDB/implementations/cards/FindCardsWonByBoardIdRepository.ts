import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  Card,
  IFindCardsWonByBoardIdRepository
} from '../../models/cards/FindCardsWonByBoardIdRepository';
import {
  PipelineReportsFilters,
  PipelineReportsQueryFilters
} from '../../models/insights/IFindConversionRateGraphDataRepository';

export class FindCardsWonByBoardIdRepository
  implements IFindCardsWonByBoardIdRepository
{
  public async find(
    boardId: number,
    filters?: PipelineReportsFilters
  ): Promise<Card[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .query<Card>(this.makeQuery(filters));
    return recordset;
  }

  private makeQuery(pipelineFilters?: PipelineReportsFilters): string {
    const filters = this.makeFilters(pipelineFilters);

    let query = `
        SELECT
            PC.Id AS id,
            PC.ColumnId As columnId,
            ISNULL(PC.LeadName, '') As name,
            ISNULL(PC.LeadEmail, '') As email,
            ISNULL(PC.LeadPhone, '') As phone,
            PC.CardValue As value,
            ISNULL(PC.AcesCodi, 0) As responsibleId,
            ISNULL(UA.AcesUsuaNome, '') AS responsibleName,
            PC.CreateDate As createdAt,
            PDH.CreatedAt As gainedAt
        FROM
            Pipeline_Card PC WITH(NOLOCK)
        INNET JOIN
            Pipeline_Column PCL WITH(NOLOCK) ON PC.ColumnId = PCL.Id 
        INNET JOIN
            Pipeline_Board PB WITH(NOLOCK) ON PCL.BoardId = PB.Id 
        INNER JOIN
            pipelineDealHistory PDH WITH(NOLOCK) ON PC.Id = PDH.dealId
        LEFT JOIN
            UsuaSistAces UA WITH(NOLOCK) ON PC.AcesCodi = UA.AcesCodi
        WHERE
            PB.Id = @BoardId 
            AND PCL.Status = 1
            AND PC.Status = 1
            AND PC.DealStatus = 1
            AND PDH.HistoryTypeId = 7
    `;

    if (filters.closedDate) query += ` ${filters.closedDate}`;

    if (filters.status) query += ` ${filters.status}`;

    if (filters.user) query += ` ${filters.user}`;

    return query;
  }

  private makeFilters(
    filters?: PipelineReportsFilters
  ): PipelineReportsQueryFilters {
    const where: PipelineReportsQueryFilters = {
      status: undefined,
      closedDate: undefined,
      user: undefined,
      showGain: true
    };

    if (!filters) return where;

    if (filters.createInitialDate && filters.createEndDate) {
      const createEndDate = new Date(filters.createEndDate);
      const formattedCreateEndDate = createEndDate
        .toISOString()
        .replace('T', ' ')
        .slice(0, -1);

      where.status += `AND PC.CreateDate BETWEEN '${filters.createInitialDate}' AND '${formattedCreateEndDate}' `;
    }

    if (filters.closedInitialDate && filters.closedEndDate) {
      const closedEndDate = new Date(filters.closedEndDate);
      closedEndDate.setDate(closedEndDate.getDate() + 1);
      const formattedClosedEndDate = closedEndDate
        .toISOString()
        .replace('T', ' ')
        .slice(0, -1);

      where.closedDate += `AND PDH.CreatedAt BETWEEN '${filters.closedInitialDate}' AND '${formattedClosedEndDate}' `;
    }

    if (filters.responsibles?.notIn?.length) {
      where.user += `AND PC.AcesCodi NOT IN (${filters.responsibles.notIn}) `;
    }

    if (filters.responsibles?.in?.length) {
      where.user += `AND PC.AcesCodi IN (${filters.responsibles.in}) `;
    }

    if (filters.responsibles?.isNull) {
      where.user += `AND PC.AcesCodi IS NULL `;
    }

    return where;
  }
}
