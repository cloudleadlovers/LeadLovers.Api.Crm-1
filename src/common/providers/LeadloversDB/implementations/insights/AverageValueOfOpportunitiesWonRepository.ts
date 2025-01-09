import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IAverageValueOfOpportunitiesWonRepository } from '../../models/insights/IAverageValueOfOpportunitiesWonRepository';
import {
  PipelineReportsFilters,
  PipelineReportsQueryFilters
} from '../../models/insights/IFindConversionRateGraphDataRepository';

export class AverageValueOfOpportunitiesWonRepository
  implements IAverageValueOfOpportunitiesWonRepository
{
  async average(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<number> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .query<{ average: number }>(this.makeQuery(pipelineFilters));
    return recordset.length ? recordset[0].average : 0;
  }

  private makeQuery(pipelineFilters?: PipelineReportsFilters): string {
    const filters = this.makeFilters(pipelineFilters);
    let query = `
      SELECT 
        AVG(PC.CardValue) AS average
      FROM 
        Pipeline_Card PC WITH(NOLOCK)
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
        PBD.Id = @BoardId
        AND PC.Status = 1
        AND PC.DealStatus = 1
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
