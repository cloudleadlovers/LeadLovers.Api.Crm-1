import { Lead } from './IFindLeadsByUsuaSistCodiRepository';

export interface IFindLeadFromMachineByPhoneRepository {
  find(
    machineId: number,
    funnelId: number,
    phone: string
  ): Promise<Pick<Lead, 'id'> | undefined>;
}
