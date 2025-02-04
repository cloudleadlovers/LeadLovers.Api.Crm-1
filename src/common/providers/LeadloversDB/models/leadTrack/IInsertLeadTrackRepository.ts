export type InsertLeadTrackParams = {
  userId: number;
  machineId?: number;
  leadUsuaSistCodi: number;
  source?: string;
  description?: string;
};

export interface IInsertLeadTrackRepository {
  insert(params: InsertLeadTrackParams): Promise<void>;
}
