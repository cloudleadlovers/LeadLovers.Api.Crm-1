import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  PipelineReportsFilters,
  PipelineReportsQueryFilters
} from '../../models/insights/IFindConversionRateGraphDataRepository';
import {
  GainConversionRateGraphData,
  IFindGainConversionRateGraphDataRepository
} from '../../models/insights/IFindGainConversionRateGraphDataRepository';

export class FindGainConversionRateGraphDataRepository
  implements IFindGainConversionRateGraphDataRepository
{
  async find(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<GainConversionRateGraphData | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .query<GainConversionRateGraphData>(this.makeQuery(pipelineFilters));
    if (!recordset.length) return undefined;
    return recordset[0];
  }

  private makeQuery(pipelineFilters?: PipelineReportsFilters): string {
    const filters = this.makeFilters(pipelineFilters);
    let query = `
        SELECT
          'WIN' AS stageType,
          COUNT(DISTINCT PC.ID) AS quantityOpportunities,
          ISNULL(SUM(PC.CardValue), 0) AS totalValueOpportunities
        FROM
            [Pipeline_Column] PCL WITH(NOLOCK)
        LEFT JOIN 
            [Pipeline_Card] PC WITH(NOLOCK) 
        ON 
            PCL.Id = PC.ColumnId 
            AND PC.[Status] = 1 
            AND PC.DealStatus = 1
        LEFT JOIN 
            [UsuaSistAces] UA WITH(NOLOCK) 
        ON 
            UA.AcesCodi = PC.AcesCodi 
    `;

    if (filters.closedDate) {
      query +=
        ' LEFT JOIN [PipelineDealHistory] PDH WITH(NOLOCK) ON PDH.DealId = PC.Id ';
    }

    query += `
        WHERE 
            PCL.BoardId = @BoardId
            AND PCL.[Status] = 1 
    `;

    if (filters.closedDate) query += ` ${filters.closedDate}`;

    if (filters.status) query += ` ${filters.status}`;

    if (filters.user) query += ` ${filters.user}`;

    query += `
        GROUP BY 
            PCL.Id, PCL.Title, PCL.[Order]
        ORDER BY 
            PCL.[Order]
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

      where.status += 'AND PC.DealStatus = 1 ';
      where.closedDate += `AND HistoryTypeId = 7 AND PDH.CreatedAt BETWEEN '${filters.closedInitialDate}' AND '${formattedClosedEndDate}' `;
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
