export type GoalHistory = {
  id: number;
  finishedAt: Date;
};

export interface IFindLastItemRepository {
  find(boardId: number): Promise<GoalHistory | undefined>;
}
