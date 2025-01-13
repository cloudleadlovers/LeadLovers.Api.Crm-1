import mssql from 'mssql';

import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  Card,
  CardFilter,
  IFindCardsByColumnIdRepository
} from '../../models/cards/IFindCardsByColumnIdRepository';

type Where = {
  name?: string;
  createdAt?: string;
  closedAt?: string;
  responsible?: string;
  status?: string;
  value?: string;
};

export class FindCardsByColumnIdRepository
  implements IFindCardsByColumnIdRepository
{
  public async find(
    columnId: number,
    pagination: Pagination,
    filters?: CardFilter
  ): Promise<ResultPaginated<Card>> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('ColumnId', mssql.Int, columnId)
      .input('Limit', mssql.Int, pagination.limit)
      .input('LastId', mssql.Int, pagination.lastId ?? null)
      .query<Card>(this.makeQuery(filters));
    return {
      items: recordset,
      nextCursor: recordset.length
        ? recordset[recordset.length - 1].id
        : undefined
    };
  }

  private makeQuery(cardFilters?: CardFilter): string {
    const filters = this.makeFilters(cardFilters);

    let query = `
      SELECT TOP (@Limit)
        PC.Id AS id,
        PC.ColumnId AS columnId,
        ISNULL(PC.LeadName, '') AS name,
        ISNULL(PC.LeadEmail, '') AS email,
        ISNULL(PC.LeadPhone, '') AS phone,
        PC.CardValue AS value,
        PC.CreateDate AS createdAt,
        ISNULL(PC.AcesCodi, 0) AS responsibleId,
        ISNULL(USA.AcesUsuaNome, '') AS responsibleName,
        ISNULL(USA.AcesUsuaFoto, '/content/images/avatar-default.png') AS responsibleIcon ,
        CASE 
            WHEN PC.DealStatus = 1 THEN PDH.CreatedAt
            ELSE NULL
        END AS gainedAt,
        CASE 
            WHEN PC.DealStatus = 0 THEN PDH.CreatedAt
            ELSE NULL
        END AS losedAt
      FROM
        Pipeline_Card PC WITH(NOLOCK)
      INNER JOIN
        pipelineDealHistory PDH WITH(NOLOCK) ON PC.Id = PDH.dealId
      LEFT JOIN
        UsuaSistAces USA WITH(NOLOCK) ON PC.AcesCodi = USA.AcesCodi
    `;

    query += `
      WHERE
        (@LastId IS NULL OR PC.Id < @LastId)
        AND PC.ColumnId = @ColumnId
        AND PC.Status = 1
    `;

    if (filters.name) query += ` ${filters.name}`;

    if (filters.createdAt) query += ` ${filters.createdAt}`;

    if (filters.closedAt) query += ` ${filters.closedAt}`;

    if (filters.responsible) query += ` ${filters.responsible}`;

    if (filters.status) query += ` ${filters.status}`;

    if (filters.value) query += ` ${filters.value}`;

    query += `
      ORDER BY 
        PC.Id DESC;
    `;

    return query;
  }

  private makeFilters(filters?: CardFilter): Where {
    const where: Where = {
      name: undefined,
      createdAt: undefined,
      closedAt: undefined,
      responsible: undefined,
      status: undefined,
      value: undefined
    };

    if (!filters) return where;

    if (filters.stateCards) {
      const { stateCards } = filters;
      if (
        stateCards.includes('OPENED') &&
        stateCards.includes('LOSED') &&
        stateCards.includes('GAINED')
      ) {
        where.status += '';
      } else if (
        stateCards.includes('GAINED') &&
        stateCards.includes('LOSED')
      ) {
        where.status += ' AND PC.DealStatus IN (0,1) ';
      } else if (
        stateCards.includes('GAINED') &&
        stateCards.includes('OPENED')
      ) {
        where.status += ' AND (PC.DealStatus IS NULL OR PC.DealStatus = 1) ';
      } else if (
        stateCards.includes('LOSED') &&
        stateCards.includes('OPENED')
      ) {
        where.status += ' AND (PC.DealStatus IS NULL OR PC.DealStatus = 0) ';
      } else if (stateCards.includes('LOSED')) {
        where.status += ' AND PC.DealStatus = 0 ';
      } else if (stateCards.includes('GAINED')) {
        where.status += ' AND PC.DealStatus = 1 ';
      } else if (stateCards.includes('OPENED')) {
        where.status += ' AND PC.DealStatus IS NULL ';
      }
    }

    if (filters.name) {
      where.name += ` AND PC.LeadName = '${filters.name}'`;
    }

    if (filters.createInitialDate && filters.createEndDate) {
      const createEndDate = new Date(filters.createEndDate);
      const formattedCreateEndDate = createEndDate
        .toISOString()
        .replace('T', ' ')
        .slice(0, -1);

      where.createdAt += ` AND PC.CreateDate BETWEEN '${filters.createInitialDate}' AND '${formattedCreateEndDate}' `;
    }

    if (filters.closedInitialDate && filters.closedEndDate) {
      const closedEndDate = new Date(filters.closedEndDate);
      closedEndDate.setDate(closedEndDate.getDate() + 1);
      const formattedClosedEndDate = closedEndDate
        .toISOString()
        .replace('T', ' ')
        .slice(0, -1);

      where.closedAt += ` AND HistoryTypeId = 7 AND PDH.CreatedAt BETWEEN '${filters.closedInitialDate}' AND '${formattedClosedEndDate}' `;
    }

    if (filters.responsibles?.notIn?.length) {
      where.responsible += ` AND PC.AcesCodi NOT IN (${filters.responsibles.notIn}) `;
    }

    if (filters.responsibles?.in?.length) {
      where.responsible += ` AND PC.AcesCodi IN (${filters.responsibles.in}) `;
    }

    if (filters.responsibles?.isNull) {
      where.responsible += ` AND PC.AcesCodi IS NULL `;
    }

    if (filters.value?.greaterThan) {
      where.value += ` AND PC.CardValue > ${filters.value.greaterThan} `;
    }

    if (filters.value?.lessThan) {
      where.value += ` AND PC.CardValue < ${filters.value.greaterThan} `;
    }

    if (filters.value?.equalTo) {
      where.value += ` AND PC.CardValue = ${filters.value.greaterThan} `;
    }

    return where;
  }
}
