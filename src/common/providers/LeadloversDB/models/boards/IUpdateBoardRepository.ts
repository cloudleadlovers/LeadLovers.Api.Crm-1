export type UpdateBoardParams = {
  boardId: number;
  logo?: string;
  title?: string;
  goal?: number;
};

export interface IUpdateBoardRepository {
  update(params: UpdateBoardParams): Promise<void>;
}
