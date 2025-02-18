export type UpdateBoardParams = {
  boardId: number;
  logo?: string;
  title?: string;
  goal?: number;
  goalRecurrency?: number;
  goalRecurrencyStartIn?: Date;
  goalRecurrencyFinishIn?: Date;
};

export interface IUpdateBoardRepository {
  update(params: UpdateBoardParams): Promise<void>;
}
