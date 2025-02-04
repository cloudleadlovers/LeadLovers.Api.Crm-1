export type InsertTagsTrackParams = {
  userId: number;
  leadUsuaSistCodi: number;
  source?: string;
};

export interface IInsertTagsTrackRepository {
  insert(params: InsertTagsTrackParams): Promise<void>;
}
