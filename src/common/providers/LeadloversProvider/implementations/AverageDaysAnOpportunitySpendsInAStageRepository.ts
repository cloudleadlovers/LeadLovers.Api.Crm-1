import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  AverageDays,
  IAverageDaysAnOpportunitySpendsInAStageRepository
} from '../models/IAverageDaysAnOpportunitySpendsInAStageRepository';
import {
  PipelineReportsFilters,
  PipelineReportsQueryFilters
} from '../models/IFindConversionRateGraphDataRepository';

export class AverageDaysAnOpportunitySpendsInAStageRepository
  implements IAverageDaysAnOpportunitySpendsInAStageRepository
{
  async average(
    boardId: number,
    days: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<AverageDays[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .input('Days', mssql.Int, days).query<AverageDays>(`
            SELECT
                PCL.Title AS title,
                AVG(
                    DATEDIFF(
                        DAY,
                        Movimentos.DataMovimentacao,
                        ISNULL(Movimentos.ProximaData, GETDATE())
                    )
                ) AS averageDays,
                ROW_NUMBER() OVER(ORDER BY PCL.[Order], PCL.[CreateDate]  ASC) AS orderNumber
            FROM (${this.makeQuery(pipelineFilters)}) AS Movimentos
            INNER JOIN 
                Pipeline_Column PCL WITH(NOLOCK) ON PCL.Id = Movimentos.OrigemEtapaId
            GROUP BY 
                PCL.Title,
                PCL.[Order],
                PCL.[CreateDate];
        `);
    return recordset;
  }

  private makeQuery(pipelineFilters?: PipelineReportsFilters): string {
    const filters = this.makeFilters(pipelineFilters);
    let query = `
        SELECT
            h.id,
            h.dealId AS NegociacaoId,
            h.columnSourceId AS OrigemEtapaId,
            h.columnDestinationId AS DestinoEtapaId,
            h.createdAt AS DataMovimentacao,
            LEAD(h.createdAt) OVER (
                PARTITION BY h.dealId
                ORDER BY h.createdAt
            ) AS ProximaData
        FROM 
            pipelineDealHistory h
        INNER JOIN 
            Pipeline_Card PC WITH(NOLOCK) ON PC.Id = h.dealId
        INNER JOIN 
            Pipeline_Column PCL WITH(NOLOCK) ON PCL.Id = PC.ColumnId
        INNER JOIN 
            Pipeline_Board PBD WITH(NOLOCK) ON PBD.Id = PCL.BoardId
    `;

    if (filters.closedDate) {
      query +=
        ' LEFT JOIN [PipelineDealHistory] PDH WITH(NOLOCK) ON PDH.DealId = PC.Id ';
    }

    query += `
      WHERE
        (h.historyTypeId = 1 OR h.historyTypeId = 2)
        AND PBD.Id = @BoardId
        AND PC.Status = 1
        AND PCL.Status = 1
        AND h.createdAt >= DATEADD(DAY, -@Days, GETDATE())
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

      where.closedDate += `AND HistoryTypeId = 7 AND PDH.CreatedAt BETWEEN '${filters.closedInitialDate}' AND '${formattedClosedEndDate}' `;
    }

    if (filters.responsibleId && filters.responsibleId > 0) {
      where.user += `AND PC.AcesCodi = '${filters.responsibleId}' `;
    }

    return where;
  }
}
