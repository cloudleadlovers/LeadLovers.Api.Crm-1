export type InsertLeadTrackParams = {
  userId: number;
  machineId?: number;
  leadUsuaSistCodi: number;
  source?: string;
  description?: string;
};

export interface IInsertLeadTrackHTTP {
  insert(params: InsertLeadTrackParams): Promise<boolean>;
}
