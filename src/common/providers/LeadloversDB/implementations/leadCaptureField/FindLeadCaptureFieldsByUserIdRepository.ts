import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import {
  IFindLeadCaptureFieldsByUserIdRepository,
  LeadCaptureField
} from '../../models/leadCaptureField/IFindLeadCaptureFieldsByUserIdRepository';

export class FindLeadCaptureFieldsByUserIdRepository
  implements IFindLeadCaptureFieldsByUserIdRepository
{
  async find(userId: number): Promise<LeadCaptureField[]> {
    const pool = await mssqlPoolConnect('leadlovers');
    const { recordset } = await pool
      .request()
      .input('IdUser', mssql.Int, userId).query<LeadCaptureField>(`
            SELECT 
            	LD.[Id] AS id, 
            	LD.[IdUser] AS userId, 
            	LD.[IdType] AS typeId, 
            	LDT.[Name] AS type, 
            	LD.[IdStatus] AS statusId, 
            	LD.[Name] AS name, 
            	LD.[Label] AS label, 
            	LD.[Tag] AS tag, 
            	LD.[RegisterDate] AS createdAt 
            FROM 
            	[dbo].[LeadCaptureField] LD WITH(NOLOCK) 
            INNER JOIN 
            	[dbo].[LeadCaptureFieldType] LDT WITH(NOLOCK) ON LD.[IdType] = LDT.[Id] 
            WHERE 
            	[IdUser] = @IdUser 
                AND [IdStatus] <> 3 
            ORDER BY 
            	LD.[Name];
        `);
    return recordset;
  }
}
