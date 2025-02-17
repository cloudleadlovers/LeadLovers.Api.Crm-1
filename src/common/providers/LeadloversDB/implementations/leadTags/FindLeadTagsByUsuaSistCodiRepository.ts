import mssql from 'mssql';
import { injectable } from 'tsyringe';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IFindLeadTagsByUsuaSistCodiRepository,
  Tag
} from '../../models/leadTags/IFindLeadTagsByUsuaSistCodiRepository';

@injectable()
export class FindLeadTagsByUsuaSistCodiRepository
  implements IFindLeadTagsByUsuaSistCodiRepository
{
  async find(usuaSistCodi: number): Promise<Tag[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: tags } = await pool
      .request()
      .input('UsuaSistCodi', mssql.Int, usuaSistCodi).query<Tag>(`
        SELECT
          T.TagId AS id,
          T.TagNome AS name,
          CONVERT(BIT,IIF(G.GatiTagId IS NULL, 0, 1)) AS tagChecked
        FROM
          LeadTag T (NOLOCK)
        LEFT OUTER JOIN
          GatiTag G (NOLOCK)
        ON
          T.TagId = G.TagId
          AND G.GatiCodi = 0
          AND G.GatiTagAcao = 1
        WHERE
          T.UsuaSistCodi = @UsuaSistCodi
        ORDER BY
          [TagChecked] DESC,
          T.TagNome
      `);
    return tags;
  }
}
