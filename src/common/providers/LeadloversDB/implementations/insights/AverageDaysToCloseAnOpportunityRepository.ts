import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IAverageDaysToCloseAnOpportunityRepository } from '../../models/insights/IAverageDaysToCloseAnOpportunityRepository';
import {
  PipelineReportsFilters,
  PipelineReportsQueryFilters
} from '../../models/insights/IFindConversionRateGraphDataRepository';

export class AverageDaysToCloseAnOpportunityRepository
  implements IAverageDaysToCloseAnOpportunityRepository
{
  async average(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<number> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId).query<{ days: number }>(`
            WITH CTE_DealDurations AS (
                ${this.makeQuery(pipelineFilters)}
            ),
            CTE_DealTimes AS (
                SELECT
                    dealId,
                    DATEDIFF(DAY, CreationDate, CloseDate) AS DurationDays
                FROM
                    CTE_DealDurations
                WHERE
                    CreationDate IS NOT NULL AND CloseDate IS NOT NULL
            )
            SELECT
                AVG(DurationDays) AS days
            FROM
                CTE_DealTimes;
        `);
    return recordset.length ? recordset[0].days : 0;
  }

  private makeQuery(pipelineFilters?: PipelineReportsFilters): string {
    const filters = this.makeFilters(pipelineFilters);
    let query = `
        SELECT
            PDH.dealId,
            MIN(CASE WHEN PDH.historyTypeId = 1 THEN PDH.createdAt END) AS CreationDate,
            MAX(CASE WHEN PDH.historyTypeId = 7 THEN PDH.createdAt END) AS CloseDate
        FROM
            PipelineDealHistory PDH
        INNER JOIN
            Pipeline_Card PC ON PDH.dealId = PC.Id
        INNER JOIN
            Pipeline_Column PCL ON PC.ColumnId = PCL.Id
        INNER JOIN
            Pipeline_Board PBD ON PCL.BoardId = PBD.Id
    `;

    query += `
        WHERE
            AND PBD.Id = @BoardId
            AND PC.Status = 1
            AND PCL.Status = 1
    `;

    if (filters.closedDate) query += ` ${filters.closedDate}`;

    if (filters.status) query += ` ${filters.status}`;

    if (filters.user) query += ` ${filters.user}`;

    query += `
        GROUP BY
                PDH.dealId
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

      where.closedDate += `AND HistoryTypeId = 7 AND PDH.CreatedAt BETWEEN '${filters.closedInitialDate}' AND '${formattedClosedEndDate}' `;
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
