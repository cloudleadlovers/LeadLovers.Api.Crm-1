import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { Lead } from '../../models/leads/IFindLeadsByUsuaSistCodiRepository';
import {
  IInsertLeadRepository,
  InsertLeadParams
} from '../../models/leads/IInsertLeadRepository';

export class InsertLeadRepository implements IInsertLeadRepository {
  async insert(params: InsertLeadParams): Promise<Pick<Lead, 'id'>> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset: result } = await pool
      .request()
      .input('insertMachine', mssql.Bit, params.insertOnMachine ? 1 : 0)
      .input('machine', mssql.Int, params.machineId ?? 0)
      .input('funnel', mssql.Int, params.funnelId ?? 0)
      .input('level', mssql.Int, params.modelIndex ?? 0)
      .input('UsuaSistCodi', mssql.Int, params.usuaSistCodi ?? 0)
      .input('phone', mssql.VarChar, params.phone ?? null)
      .input('name', mssql.VarChar, params.name ?? null)
      .input('mail', mssql.VarChar, params.email ?? null)
      .input('company', mssql.VarChar, params.company ?? null)
      .input('city', mssql.VarChar, params.city ?? null)
      .input('state', mssql.VarChar, params.state ?? null)
      .input('dateOfBirth', mssql.DateTime, params.birthDate ?? null)
      .input('score', mssql.Int, params.score ?? 0)
      .input('observation', mssql.NVarChar, params.observation ?? null)
      .input('tags', mssql.NVarChar, params.tags ?? null)
      .execute(`spAddManuallyLead`);
    const [spResult] = Object.values(result[0] as Record<string, number>);

    if (spResult == 30) throw new Error('O Usuário não existe!');

    if (spResult == 4) {
      throw new Error('O lead não pode ser inserido pois foi descadastrado.!');
    }

    return { id: spResult };
  }
}
