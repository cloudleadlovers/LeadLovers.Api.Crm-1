export type GoalHistory = {
  id: number;
  goal: number;
  achieved: number;
  startedAt: Date;
  finishedAt: Date;
};

export interface IFindGoalHistoriesByBoardIdRepository {
  find(boardId: number): Promise<GoalHistory[]>;
}
