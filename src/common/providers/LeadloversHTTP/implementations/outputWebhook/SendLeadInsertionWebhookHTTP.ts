import axios, { AxiosInstance } from 'axios';

import externalAPI from '@common/config/externalAPI';
import { ISendLeadInsertionWebhookHTTP } from '../../models/outputWebhook/ISendLeadInsertionWebhookHTTP';

export class SendLeadInsertionWebhookHTTP
  implements ISendLeadInsertionWebhookHTTP
{
  private service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL: externalAPI.outputWebhook.webhookApi,
      validateStatus: status => status < 500
    });
  }

  async send(userId: number, leadCodi: number): Promise<void> {
    const body = {
      userId: userId,
      leadId: leadCodi,
      event: 'new_lead_event'
    };
    await this.service.post('webhook', body);
  }
}
