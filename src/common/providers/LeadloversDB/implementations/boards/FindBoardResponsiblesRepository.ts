import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  FindResponsiblesFilters,
  IFindBoardResponsiblesRepository,
  Resposible
} from '../../models/boards/IFindBoardResponsiblesRepository';

export class FindBoardResponsiblesRepository
  implements IFindBoardResponsiblesRepository
{
  async find(
    boardId: number,
    filters?: FindResponsiblesFilters
  ): Promise<Resposible[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId)
      .query<Resposible>(this.makeQuery(filters));
    return recordset;
  }

  private makeQuery(filters?: FindResponsiblesFilters): string {
    let query = `
        SELECT 
            PBA.AcesCodi AS id, 
            USA.AcesUsuaNome AS name, 
            USA.AcesUsuaFoto AS photo,
            ISNULL(PBA.AccessType, 3) AS roleId
        FROM 
            Pipeline_Board_Access PBA WITH (NOLOCK) 
        INNER JOIN 
            UsuaSistAces USA WITH (NOLOCK) 
        ON 
            USA.AcesCodi = PBA.AcesCodi 
        WHERE 
            PBA.BoardId = @BoardId
    `;

    if (filters?.responsibleName) {
      query += ` AND USA.AcesUsuaNome = '${filters.responsibleName}' `;
    }

    if (filters?.roleId) query += ` AND PBA.AccessType = ${filters.roleId} `;

    return query;
  }
}
