import mssql from 'mssql';

import { cardLayout } from '@common/shared/types/CardLayout';
import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IFindCardLayoutByBoardIdRepository,
  Layout
} from '../../models/cardLayouts/IFindCardLayoutByBoardIdRepository';

type LayoutDB = Omit<Layout, 'layout'> & { layout: string };

export class FindCardLayoutByBoardIdRepository
  implements IFindCardLayoutByBoardIdRepository
{
  async find(boardId: number): Promise<Layout | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('BoardId', mssql.Int, boardId).query<LayoutDB>(`
        SELECT
          Id As id,
          BoardId AS boardId,
          Layout AS layout,
          CreateDate AS createdAt
        FROM
          Pipeline_Board_Card_Layouts WITH(NOLOCK)
        WHERE
          BoardId = @BoardId;
      `);
    return recordset.length
      ? {
          ...recordset[0],
          layout: cardLayout.parse(JSON.parse(recordset[0].layout))
        }
      : undefined;
  }
}
