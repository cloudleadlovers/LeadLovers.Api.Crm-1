import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  Column,
  ColumnFilter,
  IFindColumnsByBoardIdRepository
} from '../../models/columns/IFindColumnsByBoardIdRepository';

type ColumnWhere = {
  columns?: string;
};

export class FindColumnsByBoardIdRepository
  implements IFindColumnsByBoardIdRepository
{
  public async find(boardId: number, filter?: ColumnFilter): Promise<Column[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .query<Column>(this.makeQuery(filter));
    return recordset;
  }

  private makeQuery(filter?: ColumnFilter): string {
    const filters = this.makeFilters(filter);
    let query = `
      SELECT
        PCL.Id AS id,
        PCL.BoardId AS boardId,
        PCL.Title AS name,
        PCL.Color AS color,
        PCL.[Order] AS order,
        COUNT(PC.Id) AS amountCards,
        ISNULL(SUM(CASE WHEN PC.DealStatus = 1 THEN PC.CardValue END), 0) AS earnedRevenue,
        PCL.CreateDate AS createdAt
      FROM
        Pipeline_Column PCL WITH(NOLOCK) 
      INNER JOIN 
        Pipeline_Card PC WITH(NOLOCK) ON PCL.Id = PC.ColumnId
    `;

    query += `
      WHERE
        PCL.BoardId = @BoardId
        AND PCL.Status = 1
        AND PC.Status = 1
    `;

    if (filters.columns) query += ` ${filters.columns}`;

    query += `
      GROUP BY
        PCL.Id, 
        PCL.BoardId, 
        PCL.Title, 
        PCL.Color, 
        PCL.[Order], 
        PCL.CreateDate;
    `;

    return query;
  }

  private makeFilters(filter?: ColumnFilter): ColumnWhere {
    const where: ColumnWhere = {
      columns: undefined
    };

    if (!filter) return where;

    if (filter.column?.notIn?.length) {
      where.columns += ` AND PCL.Id NOT IN (${filter.column.notIn}) `;
    }

    if (filter.column?.in?.length) {
      where.columns += ` AND PCL.Id IN (${filter.column.in}) `;
    }

    return where;
  }
}