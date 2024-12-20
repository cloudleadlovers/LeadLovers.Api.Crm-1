import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  PipelineReportsFilters,
  PipelineReportsQueryFilters
} from '../models/IFindConversionRateGraphDataRepository';
import {
  ISumWonOpportunitiesGroupedByCreationDateRepository,
  SumWonOpportunities
} from '../models/ISumWonOpportunitiesGroupedByCreationDateRepository';

export class SumWonOpportunitiesGroupedByCreationDateRepository
  implements ISumWonOpportunitiesGroupedByCreationDateRepository
{
  async sum(
    boardId: number,
    initialDate: Date,
    endDate: Date,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<SumWonOpportunities[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .input('InitialDate', mssql.DateTime, initialDate)
      .input('EndDate', mssql.DateTime, endDate).query<SumWonOpportunities>(`
            WITH opportunities AS (
                ${this.makeQuery(pipelineFilters)}
            )
            SELECT
                creationDate,
                SUM(opportunityValue) AS opportunitiesValue,
                COUNT(opportunityId) AS opportunitiesNumber
            FROM 
                opportunities
            WHERE
                rowNumber = 1
            GROUP BY
                creationDate
            ORDER BY
                creationDate;
        `);
    return recordset;
  }

  private makeQuery(pipelineFilters?: PipelineReportsFilters): string {
    const filters = this.makeFilters(pipelineFilters);
    let query = `
        SELECT
            PDH.dealId AS opportunityId,
            PC.CardValue AS opportunityValue,
            CONVERT(DATE, PDH.CreatedAt) AS creationDate,
            ROW_NUMBER() OVER (PARTITION BY PDH.dealId ORDER BY PDH.CreatedAt DESC) AS rowNumber
        FROM
            pipelineDealHistory PDH WITH(NOLOCK)
        INNER JOIN 
            Pipeline_Card PC WITH(NOLOCK)
        ON
            PC.Id = PDH.dealId
        INNER JOIN 
            Pipeline_Column PCL WITH(NOLOCK) 
        ON 
            PCL.Id = PC.ColumnId
        INNER JOIN 
            Pipeline_Board PBD WITH(NOLOCK) 
        ON 
            PBD.Id = PCL.BoardId
    `;

    query += `
        WHERE
            PBD.Id = @Board
            AND PC.DealStatus = 1
            AND PDH.HistoryTypeId = 7
            AND PDH.CreatedAt BETWEEN @InitialDate AND @EndDate
    `;

    if (filters.status) query += ` ${filters.status}`;

    if (filters.user) query += ` ${filters.user}`;

    query += `
        GROUP BY
            PDH.dealId,
            PC.CardValue,
            PDH.CreatedAt;
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

    if (filters.responsibleId && filters.responsibleId > 0) {
      where.user += `AND PC.AcesCodi = '${filters.responsibleId}' `;
    }

    return where;
  }
}
