import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  Board,
  FindBoardsFilters,
  IFindBoardsByUsuaSistCodiRepository
} from '../../models/boards/IFindBoardsByUsuaSistCodiRepository';

export class FindBoardsByUsuaSistCodiRepository
  implements IFindBoardsByUsuaSistCodiRepository
{
  async find(
    usuaSistCodi: number,
    filter?: FindBoardsFilters
  ): Promise<Board[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('UsuaSistCodi', mssql.Int, usuaSistCodi)
      .query<Board>(this.makeQuery(filter));
    return recordset;
  }

  private makeQuery(filter?: FindBoardsFilters): string {
    let query = `
        SELECT 
            PB.[Id] AS id, 
            ISNULL(PB.[Logo], '') AS logo,
            PB.[Title] AS title,
            ISNULL(PB.[Goal], 0) AS goal,
            COUNT(PC.[Id]) AS cardQuantity,
            SUM(CASE
                WHEN PC.[Status] NOT IN (0, 2) AND PC.[DealStatus] = 1 THEN PC.[CardValue] 
                ELSE 0 
            END) AS totalCardValue,
            PB.[CreateDate] AS createdAt
        FROM 
            [Pipeline_Board] PB WITH (NOLOCK)
        LEFT JOIN 
            [Pipeline_Column] PCL WITH (NOLOCK)
            ON PCL.[BoardId] = PB.[Id] AND PCL.[Status] = 1
        LEFT JOIN 
            [Pipeline_Card] PC WITH (NOLOCK)
            ON PC.[ColumnId] = PCL.[Id]
            AND PC.[Status] NOT IN (0, 2)
        WHERE 
            PB.[UsuaSistCodi] = @UsuaSistCodi 
            AND PB.[AcesCodi] IS NULL 
            AND PB.[Status] = 1
    `;

    if (filter?.createInitialDate && filter?.createEndDate) {
      const createEndDate = new Date(filter.createEndDate);
      const formattedCreateEndDate = createEndDate
        .toISOString()
        .replace('T', ' ')
        .slice(0, -1);

      query += ` AND PB.[CreateDate] BETWEEN '${filter.createInitialDate}' AND '${formattedCreateEndDate}' `;
    }

    query += `
        GROUP BY 
            PB.[Id],
            PB.[Logo],
            PB.[Title],
            PB.[Goal],
            PB.[CreateDate]
        ORDER BY 
            PB.[CreateDate] ASC;
    `;

    return query;
  }
}
