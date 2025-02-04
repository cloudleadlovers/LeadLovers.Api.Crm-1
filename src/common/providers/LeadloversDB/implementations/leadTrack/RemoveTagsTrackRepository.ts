import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IRemoveTagsTrackRepository,
  RemoveTagsTrackParams
} from '../../models/leadTrack/IRemoveTagsTrackRepository';

export class RemoveTagsTrackRepository implements IRemoveTagsTrackRepository {
  async remove(params: RemoveTagsTrackParams): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('userId', mssql.Int, params.userId)
      .input('machineId', mssql.Int, 0)
      .input('lead', mssql.Int, params.leadUsuaSistCodi)
      .input('refId', mssql.Int, params.leadUsuaSistCodi)
      .input('refType', mssql.Int, 62)
      .input('src', mssql.NVarChar, params.source ?? '')
      .input('dsc', mssql.NVarChar, 'Tag removida no cadastro manual')
      .execute(`spAddLeadTrack`);
  }
}
