import externalAPI from '@common/config/externalAPI';
import axios, { AxiosInstance } from 'axios';
import { logger } from 'infa/logger/pinoLogger';
import {
  IRemoveTagsTrackHTTP,
  RemoveTagsTrackParams
} from '../../models/leadTrack/IRemoveTagsTrackHTTP';

export class RemoveTagsTrackHTTP implements IRemoveTagsTrackHTTP {
  private service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL: externalAPI.leadTrack.addApi,
      validateStatus: status => status < 500
    });
  }

  async remove(params: RemoveTagsTrackParams): Promise<boolean> {
    try {
      const body = {
        userId: params.userId,
        machineId: 0,
        leadId: params.leadUsuaSistCodi,
        referenceId: params.leadUsuaSistCodi,
        referenceType: 62,
        source: params.source ?? '',
        description: 'Tag removida no cadastro manual',
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
