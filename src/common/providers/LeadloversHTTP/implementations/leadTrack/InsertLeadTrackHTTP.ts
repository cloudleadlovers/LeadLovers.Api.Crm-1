import externalAPI from '@common/config/externalAPI';
import axios, { AxiosInstance } from 'axios';
import { logger } from 'infa/logger/pinoLogger';
import {
  IInsertLeadTrackHTTP,
  InsertLeadTrackParams
} from '../../models/leadTrack/IInsertLeadTrackHTTP';

export class InsertLeadTrackHTTP implements IInsertLeadTrackHTTP {
  private service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL: externalAPI.leadTrack.addApi,
      validateStatus: status => status < 500
    });
  }

  async insert(params: InsertLeadTrackParams): Promise<boolean> {
    try {
      const body = {
        userId: params.userId,
        machineId: params.machineId ?? 0,
        leadId: params.leadUsuaSistCodi,
        referenceId: params.leadUsuaSistCodi,
        referenceType: 61,
        source: params.source ?? '',
        description: params.description ?? '',
        trackDate: new Date()
      };
      const response = await this.service.post('add', body);
      if (response.status !== 200) return false;
      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }
}
