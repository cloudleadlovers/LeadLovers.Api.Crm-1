import mssql from 'mssql';

import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IRemoveCardNotificationRepository } from '../../models/notifications/IRemoveCardNotificationRepository';

export class RemoveCardNotificationRepository
  implements IRemoveCardNotificationRepository
{
  public async remove(cardId: number): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool.request().input('CardId', mssql.Int, cardId).query(`
      DELETE FROM 
        PipelineNotification_Emails 
      WHERE 
        CardId = @CardId;
    `);
  }
}
