import mssql from 'mssql';

import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { Card } from '../../models/cards/IFindCardsByColumnIdRepository';
import { IFindCardsWonByBoardIdRepository } from '../../models/cards/IFindCardsWonByBoardIdRepository';
import {
  PipelineReportsFilters,
  PipelineReportsQueryFilters
} from '../../models/insights/IFindConversionRateGraphDataRepository';

export class FindCardsWonByBoardIdRepository
  implements IFindCardsWonByBoardIdRepository
{
  public async find(
    boardId: number,
    pagination: Pagination,
    filters?: PipelineReportsFilters
  ): Promise<
    ResultPaginated<
      Pick<
        Card,
        | 'id'
        | 'name'
        | 'email'
        | 'phone'
        | 'value'
        | 'responsibleId'
        | 'responsibleName'
        | 'createdAt'
        | 'gainedAt'
      >
    >
  > {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .input('Limit', mssql.Int, pagination.limit)
      .input('LastId', mssql.Int, pagination.lastId ?? null)
      .query<
        Pick<
          Card,
          | 'id'
          | 'name'
          | 'email'
          | 'phone'
          | 'value'
          | 'responsibleId'
          | 'responsibleName'
          | 'createdAt'
          | 'gainedAt'
        >
      >(this.makeQuery(filters));
    return {
      items: recordset,
      nextCursor: recordset.length
        ? recordset[recordset.length - 1].id
        : undefined
    };
  }

  private makeQuery(pipelineFilters?: PipelineReportsFilters): string {
    const filters = this.makeFilters(pipelineFilters);

    let query = `
      SELECT TOP (@Limit)
        PC.Id AS id,
        PC.ColumnId AS columnId,
        ISNULL(PC.LeadName, '') AS name,
        ISNULL(PC.LeadEmail, '') AS email,
        ISNULL(PC.LeadPhone, '') AS phone,
        PC.CardValue AS value,
        ISNULL(PC.AcesCodi, 0) AS responsibleId,
        ISNULL(USA.AcesUsuaNome, '') AS responsibleName,
        PC.CreateDate AS createdAt,
        PDH.CreatedAt AS gainedAt
      FROM
        Pipeline_Card PC WITH(NOLOCK)
      INNET JOIN
        Pipeline_Column PCL WITH(NOLOCK) ON PC.ColumnId = PCL.Id 
      INNET JOIN
        Pipeline_Board PB WITH(NOLOCK) ON PCL.BoardId = PB.Id 
      INNER JOIN
        pipelineDealHistory PDH WITH(NOLOCK) ON PC.Id = PDH.dealId
      LEFT JOIN
        UsuaSistAces USA WITH(NOLOCK) ON PC.AcesCodi = USA.AcesCodi
      WHERE
        (@LastId IS NULL OR PC.Id < @LastId)
        AND PB.Id = @BoardId
        AND PCL.Status = 1
        AND PC.Status = 1
        AND PC.DealStatus = 1
        AND PDH.HistoryTypeId = 7
    `;

    if (filters.closedDate) query += ` ${filters.closedDate}`;

    if (filters.status) query += ` ${filters.status}`;

    if (filters.user) query += ` ${filters.user}`;

    query += `
      ORDER BY 
        PC.Id DESC;
    `;

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
