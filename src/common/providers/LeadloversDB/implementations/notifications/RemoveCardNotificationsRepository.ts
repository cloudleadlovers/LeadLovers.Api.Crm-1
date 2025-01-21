import { mssqlPoolConnect } from 'infa/db/mssqlClient';
import { IRemoveCardNotificationsRepository } from '../../models/notifications/IRemoveCardNotificationsRepository';

export class RemoveCardNotificationsRepository
  implements IRemoveCardNotificationsRepository
{
  public async remove(cardIds: number[]): Promise<void> {
    const pool = await mssqlPoolConnect('leadlovers');
    await pool.request().query(`
      DELETE FROM 
        PipelineNotification_Emails 
      WHERE 
        CardId IN (${cardIds});
    `);
  }
}
