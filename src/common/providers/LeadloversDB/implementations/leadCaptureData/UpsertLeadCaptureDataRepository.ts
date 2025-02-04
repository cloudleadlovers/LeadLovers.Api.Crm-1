import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IUpsertLeadCaptureDataRepository,
  UpsertLeadCaptureDataParams
} from '../../models/leadCaptureData/IUpsertLeadCaptureDataRepository';

export class UpsertLeadCaptureDataRepository
  implements IUpsertLeadCaptureDataRepository
{
  async upsert(params: UpsertLeadCaptureDataParams): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool
      .request()
      .input('form', mssql.Int, null)
      .input('page', mssql.Int, null)
      .input('field', mssql.Int, params.fieldId)
      .input('type', mssql.Int, params.fieldType)
      .input('lead', mssql.Int, params.leadUsuaSistCodi)
      .input('name', mssql.NVarChar, params.fieldName)
      .input('tag', mssql.NVarChar, params.fieldTag)
      .input('value', mssql.NVarChar, params.fieldValue)
      .execute(`spAddLeadDynamicField`);
  }
}
