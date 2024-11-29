import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  PipelineReportsFilters,
  PipelineReportsQueryFilters
} from '../models/IFindConversionRateGraphDataRepository';
import {
  IFindOpportunityStatisticsByResponsibleRepository,
  OpportunityStatisticsByResponsible
} from '../models/IFindOpportunityStatisticsByResponsibleRepository';

export class FindOpportunityStatisticsByResponsibleRepository
  implements IFindOpportunityStatisticsByResponsibleRepository
{
  async find(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<OpportunityStatisticsByResponsible[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .query<OpportunityStatisticsByResponsible>(
        this.makeQuery(pipelineFilters)
      );
    return recordset;
  }

  private makeQuery(pipelineFilters?: PipelineReportsFilters): string {
    const filters = this.makeFilters(pipelineFilters);
    let query = `
        SELECT
            USA.AcesUsuaNome AS responsibleName,
            AVG(PC.CardValue) AS valueOportunities,
            COUNT(DISTINCT CASE WHEN PC.DealStatus = 1 THEN PDH.dealId END) AS countWinOpportunities,
            ISNULL(SUM(CASE WHEN PC.DealStatus = 1 THEN PC.CardValue END), 0) AS winAmount,
            AVG(CASE 
                    WHEN PC.DealStatus = 1 THEN DATEDIFF(SECOND, PDH.createdAt, PDHW.latestCreatedAt) 
                END) / 86400.0 AS averageTimeToWinDays,
            COUNT(DISTINCT PDH.dealId) AS totalOpportunities
        FROM
            Pipeline_Card PC WITH(NOLOCK)
        INNER JOIN 
            [UsuaSistAces] USA WITH(NOLOCK) ON USA.AcesCodi = PC.AcesCodi
        INNER JOIN 
            Pipeline_Column PCL WITH(NOLOCK) ON PCL.Id = PC.ColumnId
        INNER JOIN 
            Pipeline_Board PBD WITH(NOLOCK) ON PBD.Id = PCL.BoardId
        LEFT JOIN
            pipelineDealHistory PDH WITH(NOLOCK) ON PC.Id = PDH.dealId AND PDH.historyTypeId = 1
        LEFT JOIN 
            (
                SELECT 
                    PDH.dealId,
                    MAX(PDH.createdAt) AS latestCreatedAt
                FROM 
                    pipelineDealHistory PDH WITH(NOLOCK)
                WHERE 
                    PDH.historyTypeId = 7
                GROUP BY 
                    PDH.dealId
            ) PDHW ON PDH.dealId = PDHW.dealId
    `;

    query += `
        WHERE 
            PBD.Id = @BoardId
            AND PC.Status = 1
            AND PC.AcesCodi = @AcesCodi 
    `;

    if (filters.status) query += ` ${filters.status}`;

    if (filters.user) query += ` ${filters.user}`;

    query += `
        GROUP BY 
            USA.AcesUsuaNome;
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
