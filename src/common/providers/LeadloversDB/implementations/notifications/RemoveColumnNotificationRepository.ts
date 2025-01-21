import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IRemoveColumnNotificationRepository } from '../../models/notifications/IRemoveColumnNotificationRepository';

export class RemoveColumnNotificationRepository
  implements IRemoveColumnNotificationRepository
{
  public async remove(columnId: number): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool.request().input('ColumnId', mssql.Int, columnId).query(`
      DELETE FROM 
        Pipeline_Column_Notifications 
      WHERE 
        ColumnId = @ColumnId;
    `);
  }
}
