export type GoalHistory = {
  id: number;
  finishedAt: Date;
};

export interface IFindLastGoalHistoryRepository {
  find(boardId: number): Promise<GoalHistory | undefined>;
}
