import mssql from 'mssql';
import { injectable } from 'tsyringe';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IFindLeadTagByNameRepository } from '../../models/leadTags/IFindLeadTagByNameRepository';
import { Tag } from '../../models/leadTags/IFindLeadTagsByUsuaSistCodiRepository';

@injectable()
export class FindLeadTagByNameRepository
  implements IFindLeadTagByNameRepository
{
  async find(usuaSistCodi: number, name: string): Promise<Tag | undefined> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: tags } = await pool
      .request()
      .input('UsuaSistCodi', mssql.Int, usuaSistCodi)
      .input('TagNome', mssql.NVarChar, name).query<Tag>(`
        SELECT
          TagId AS id,
          T.TagNome AS name,
          CONVERT(BIT,IIF(G.GatiTagId IS NULL, 0, 1)) AS tagChecked
        FROM
          LeadTag WITH(NOLOCK)
        WHERE
          UsuaSistCodi = @UsuaSistCodi
          AND TagNome = @TagNome;
      `);
    return tags.length ? tags[0] : undefined;
  }
}
