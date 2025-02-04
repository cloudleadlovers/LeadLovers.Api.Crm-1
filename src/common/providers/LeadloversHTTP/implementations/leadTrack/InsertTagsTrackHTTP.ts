import externalAPI from '@common/config/externalAPI';
import axios, { AxiosInstance } from 'axios';
import {
  IInsertTagsTrackHTTP,
  InsertTagsTracParams
} from '../../models/leadTrack/IInsertTagsTrackHTTP';

export class InsertTagsTrackHTTP implements IInsertTagsTrackHTTP {
  private service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL: externalAPI.leadTrack.addApi,
      validateStatus: status => status < 500
    });
  }

  async insert(params: InsertTagsTracParams): Promise<boolean> {
    const body = {
      userId: params.userId,
      machineId: 0,
      leadId: params.leadUsuaSistCodi,
      referenceId: params.leadUsuaSistCodi,
      referenceType: 59,
      source: params.source ?? '',
      description: 'Tag cadastrada no cadastro manual',
      trackDate: new Date()
    };
    const response = await this.service.post('add', body);
    if (response.status !== 200) return false;
    return true;
  }
}
