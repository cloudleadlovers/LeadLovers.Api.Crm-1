import { Lead } from './IFindLeadsByUsuaSistCodiRepository';

export type InsertLeadParams = {
  insertOnMachine: boolean;
  machineId?: number;
  funnelId?: number;
  modelIndex?: number;
  usuaSistCodi?: number;
  phone?: string;
  name?: string;
  email?: string;
  company?: string;
  city?: string;
  state?: string;
  birthDate?: Date;
  score?: number;
  observation?: string;
  tags?: string;
};

export interface IInsertLeadRepository {
  insert(params: InsertLeadParams): Promise<Pick<Lead, 'id'>>;
}
