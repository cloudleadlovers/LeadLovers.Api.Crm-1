export type InsertLeadLogParams = {
  userId: number;
  leadCodi: number;
  tags: string;
  subuser?: number;
};
export interface IInsertLeadLogStorage {
  insert(params: InsertLeadLogParams): Promise<void>;
}
