import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  PipelineReportsFilters,
  PipelineReportsQueryFilters
} from '../../models/insights/IFindConversionRateGraphDataRepository';
import {
  ISumValueOfColumnsRepository,
  SumValueOfColumns
} from '../../models/insights/ISumValueOfColumnsRepository';

export class SumValueOfColumnsRepository
  implements ISumValueOfColumnsRepository
{
  async sum(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<SumValueOfColumns[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .query<SumValueOfColumns>(this.makeQuery(pipelineFilters));
    return recordset;
  }

  private makeQuery(pipelineFilters?: PipelineReportsFilters): string {
    const filters = this.makeFilters(pipelineFilters);
    let query = `
        SELECT
            PCL.Title as columName,
            ISNULL(PCL.ColumnDefaultValue, 0) as estimatedGoal,
            SUM(ISNULL(PC.CardValue, 0)) AS opportunitiesValue,
            PCL.[Order] As orderNumber
        FROM
            Pipeline_Column PCL WITH(NOLOCK)
        INNER JOIN 
            Pipeline_Card PC WITH(NOLOCK)
        ON
            PC.ColumnId = PCL.Id
    `;

    query += `
        WHERE
            PCL.BoardId = @BoardId
            AND PCL.Status = 1
            AND PC.DealStatus = 1
            AND PC.Status = 1
    `;

    if (filters.status) query += ` ${filters.status}`;

    if (filters.user) query += ` ${filters.user}`;

    query += `
        GROUP BY
            PCL.Title, 
            PCL.ColumnDefaultValue,
            PCL.[Order]
    `;

    query += `
        ORDER BY 
            PCL.[Order] ASC;
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

    if (filters.responsibles?.notIn.length) {
      where.user += `AND PC.AcesCodi NOT IN (${filters.responsibles.notIn}) `;
    }

    if (filters.responsibles?.in.length) {
      where.user += `AND PC.AcesCodi IN (${filters.responsibles.in}) `;
    }

    if (filters.responsibles?.isNull) {
      where.user += `AND PC.AcesCodi IS NULL `;
    }

    return where;
  }
}
