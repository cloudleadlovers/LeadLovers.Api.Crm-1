import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IInsertLeadOnWhatsAppMachineRepository,
  InsertLeadOnWhatsAppMachineParams
} from '../../models/leads/IInsertLeadOnWhatsAppMachineRepository';

export class InsertLeadOnWhatsAppMachineRepository
  implements IInsertLeadOnWhatsAppMachineRepository
{
  async insert(params: InsertLeadOnWhatsAppMachineParams): Promise<number> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: result } = await pool
      .request()
      .input('id', mssql.Int, params.machineId)
      .input('funil', mssql.Int, params.funnelId)
      .input('nivelfunil', mssql.Int, params.modelIndex)
      .input('stat', mssql.Int, 1)
      .input('source', mssql.VarChar, 'Pipeline')
      .input('impocodi', mssql.Int, null)
      .input('leadAdsCodi', mssql.Int, 0)
      .input('phone', mssql.VarChar, params.phone)
      .input('name', mssql.VarChar, params.name ?? null)
      .input('email', mssql.VarChar, params.email ?? null)
      .input('empresa', mssql.VarChar, params.company ?? null)
      .input('cidade', mssql.VarChar, params.city ?? null)
      .input('estado', mssql.VarChar, params.state ?? null)
      .input(
        'dataNascimento',
        mssql.VarChar,
        params.birthDate?.toISOString() ?? null
      )
      .execute(`importaContatosSMS`);
    const [spResult] = Object.values(result[0] as Record<string, number>);
    return spResult;
  }
}
