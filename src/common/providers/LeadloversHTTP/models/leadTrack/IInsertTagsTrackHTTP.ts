export type InsertTagsTracParams = {
  userId: number;
  leadUsuaSistCodi: number;
  source?: string;
};

export interface IInsertTagsTrackHTTP {
  insert(params: InsertTagsTracParams): Promise<boolean>;
}
