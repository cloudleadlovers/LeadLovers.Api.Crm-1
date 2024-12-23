import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  AverageDays,
  IAverageDaysAnOpportunitySpendsInAStageRepository
} from '../../models/insights/IAverageDaysAnOpportunitySpendsInAStageRepository';
import {
  PipelineReportsFilters,
  PipelineReportsQueryFilters
} from '../../models/insights/IFindConversionRateGraphDataRepository';

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
                PCL.Title AS stageTitle,
                AVG(
                    DATEDIFF(
                        DAY,
                        Movements.actionDate,
                        ISNULL(Movements.nextDate, GETDATE())
                    )
                ) AS averageDealDuration,
                ROW_NUMBER() OVER(ORDER BY PCL.[Order], PCL.[CreateDate]  ASC) AS stageOrderNumber
            FROM (${this.makeQuery(pipelineFilters)}) AS Movements
            INNER JOIN 
                Pipeline_Column PCL WITH(NOLOCK) ON PCL.Id = Movements.ColumnFromId
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
            PDH.id,
            PDH.dealId AS cardId,
            PDH.columnSourceId AS ColumnFromId,
            PDH.columnDestinationId AS ColumnToId,
            PDH.createdAt AS actionDate,
            LEAD(PDH.createdAt) OVER (
                PARTITION BY PDH.dealId
                ORDER BY PDH.createdAt
            ) AS nextDate
        FROM 
            pipelineDealHistory PDH WITH(NOLOCK)
        INNER JOIN 
            Pipeline_Card PC WITH(NOLOCK) ON PC.Id = PDH.dealId
        INNER JOIN 
            Pipeline_Column PCL WITH(NOLOCK) ON PCL.Id = PC.ColumnId
        INNER JOIN 
            Pipeline_Board PBD WITH(NOLOCK) ON PBD.Id = PCL.BoardId
    `;

    query += `
      WHERE
        (PDH.historyTypeId = 1 OR PDH.historyTypeId = 2)
        AND PBD.Id = @BoardId
        AND PC.Status = 1
        AND PCL.Status = 1
        AND PDH.createdAt >= DATEADD(DAY, -@Days, GETDATE())
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
