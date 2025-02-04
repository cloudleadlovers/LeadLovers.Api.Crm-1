export type RemoveTagsTrackParams = {
  userId: number;
  leadUsuaSistCodi: number;
  source?: string;
};

export interface IRemoveTagsTrackHTTP {
  remove(params: RemoveTagsTrackParams): Promise<boolean>;
}
