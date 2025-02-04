export type InsertLeadOnWhatsAppMachineParams = {
  machineId: number;
  funnelId: number;
  modelIndex: number;
  name?: string;
  phone: string;
  email?: string;
  company?: string;
  city?: string;
  state?: string;
  birthDate?: Date;
};

export interface IInsertLeadOnWhatsAppMachineRepository {
  insert(params: InsertLeadOnWhatsAppMachineParams): Promise<number>;
}
