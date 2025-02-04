import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IInsertTagsTrackRepository,
  InsertTagsTrackParams
} from '../../models/leadTrack/IInsertTagsTrackRepository';

export class InsertTagsTrackRepository implements IInsertTagsTrackRepository {
  async insert(params: InsertTagsTrackParams): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('userId', mssql.Int, params.userId)
      .input('machineId', mssql.Int, 0)
      .input('lead', mssql.Int, params.leadUsuaSistCodi)
      .input('refId', mssql.Int, params.leadUsuaSistCodi)
      .input('refType', mssql.Int, 59)
      .input('src', mssql.NVarChar, params.source ?? '')
      .input('dsc', mssql.NVarChar, 'Tag cadastrada no cadastro manual')
      .execute(`spAddLeadTrack`);
  }
}
