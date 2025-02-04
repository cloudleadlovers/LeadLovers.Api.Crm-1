import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IInsertLeadTrackRepository,
  InsertLeadTrackParams
} from '../../models/leadTrack/IInsertLeadTrackRepository';

export class InsertLeadTrackRepository implements IInsertLeadTrackRepository {
  async insert(params: InsertLeadTrackParams): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('userId', mssql.Int, params.userId)
      .input('machineId', mssql.Int, params.machineId ?? 0)
      .input('lead', mssql.Int, params.leadUsuaSistCodi)
      .input('refId', mssql.Int, params.leadUsuaSistCodi)
      .input('refType', mssql.Int, 61)
      .input('src', mssql.NVarChar, params.source ?? '')
      .input('dsc', mssql.NVarChar, params.description ?? '')
      .execute(`spAddLeadTrack`);
  }
}
