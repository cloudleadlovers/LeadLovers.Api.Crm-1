import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  ConversionRateGraphData,
  IFindConversionRateGraphDataRepository,
  PipelineReportsFilters,
  PipelineReportsQueryFilters
} from '../../models/insights/IFindConversionRateGraphDataRepository';

export class FindConversionRateGraphDataRepository
  implements IFindConversionRateGraphDataRepository
{
  async find(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<ConversionRateGraphData[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .query<ConversionRateGraphData>(this.makeQuery(pipelineFilters));
    return recordset;
  }

  private makeQuery(pipelineFilters?: PipelineReportsFilters): string {
    const filters = this.makeFilters(pipelineFilters);
    let query = `
        SELECT
            PCL.Id AS stageId,
            PCL.Title AS stageTitle,
            'Custom' AS stageType,
            COUNT(PC.ID) AS quantityOpportunities,
            ISNULL(SUM(PC.CardValue), 0) AS totalValueOpportunities,
            COUNT(IIF(PC.DealStatus = 1, 1, NULL)) AS winCountOpportunitiesInStage,
            SUM(CASE WHEN PC.DealStatus = 1 THEN PC.CardValue ELSE 0 END) AS winAmountOpportunitiesInStage
        FROM
            [Pipeline_Column] PCL WITH(NOLOCK)
        LEFT JOIN [Pipeline_Card] PC WITH(NOLOCK) ON PCL.Id = PC.ColumnId AND PC.[Status] = 1 
    `;

    if (filters.status) query += ` ${filters.status}`;

    if (filters.user) query += ` ${filters.user}`;

    query +=
      ' LEFT JOIN [UsuaSistAces] UA WITH(NOLOCK) ON UA.AcesCodi = PC.AcesCodi ';

    if (filters.closedDate) {
      query +=
        ' LEFT JOIN [PipelineDealHistory] PDH WITH(NOLOCK) ON PDH.DealId = PC.Id ';
      query += ` ${filters.closedDate}`;
    }

    query += `
        WHERE 
            PCL.BoardId = @BoardId
            AND PCL.[Status] = 1 
    `;

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
    let permissionFilterStatus = false;
    const where: PipelineReportsQueryFilters = {
      status: undefined,
      closedDate: undefined,
      user: undefined,
      showGain: true
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
        where.status += 'AND PC.DealStatus IN (0,1) ';
      } else if (
        stateCards.includes('GAINED') &&
        stateCards.includes('OPENED')
      ) {
        where.status += 'AND (PC.DealStatus IS NULL OR PC.DealStatus = 1) ';
      } else if (
        stateCards.includes('LOSED') &&
        stateCards.includes('OPENED')
      ) {
        where.status += 'AND (PC.DealStatus IS NULL OR PC.DealStatus = 0) ';
        where.showGain = false;
      } else if (stateCards.includes('LOSED')) {
        where.status += 'AND PC.DealStatus = 0 ';
        where.showGain = false;
      } else if (stateCards.includes('GAINED')) {
        where.status += 'AND PC.DealStatus = 1 ';
      } else if (stateCards.includes('OPENED')) {
        where.status += 'AND PC.DealStatus IS NULL ';
        where.showGain = false;
        permissionFilterStatus = true;
      }
    }

    if (filters.createInitialDate && filters.createEndDate) {
      const createEndDate = new Date(filters.createEndDate);
      const formattedCreateEndDate = createEndDate
        .toISOString()
        .replace('T', ' ')
        .slice(0, -1);

      where.status += `AND PC.CreateDate BETWEEN '${filters.createInitialDate}' AND '${formattedCreateEndDate}' `;
    }

    if (
      filters.closedInitialDate &&
      filters.closedEndDate &&
      !permissionFilterStatus
    ) {
      const closedEndDate = new Date(filters.closedEndDate);
      closedEndDate.setDate(closedEndDate.getDate() + 1);
      const formattedClosedEndDate = closedEndDate
        .toISOString()
        .replace('T', ' ')
        .slice(0, -1);

      where.status += 'AND PC.DealStatus = 1 ';
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
