import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { Tag } from '../../models/leadTags/IFindLeadTagsByUsuaSistCodiRepository';
import { IInsertLeadTagRepository } from '../../models/leadTags/IInsertLeadTagRepository';

export class InsertLeadTagRepository implements IInsertLeadTagRepository {
  async insert(
    usuaSistCodi: number,
    tagName: string
  ): Promise<Pick<Tag, 'id'>> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: tags } = await pool
      .request()
      .input('UsuaSistCodi', mssql.Int, usuaSistCodi)
      .input('TagNome', mssql.NVarChar, tagName).query<Pick<Tag, 'id'>>(`
        INSERT INTO
          LeadTag (TagNome, TagData, UsuaSistCodi)
        OUTPUT
          inserted.TagId AS id
        VALUES (
          @TagNome,
          GETDATE(),
          @UsuaSistCodi
        );
      `);
    return tags[0];
  }
}
