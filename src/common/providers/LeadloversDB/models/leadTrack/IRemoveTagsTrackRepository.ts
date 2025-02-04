export type RemoveTagsTrackParams = {
  userId: number;
  leadUsuaSistCodi: number;
  source?: string;
};

export interface IRemoveTagsTrackRepository {
  remove(params: RemoveTagsTrackParams): Promise<void>;
}
