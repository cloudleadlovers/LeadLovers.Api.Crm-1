export type GoalHistory = {
  id: number;
  goal: number;
  achieved: number;
  startedAt: Date;
  finishedAt: Date;
};

export interface IFindByBoardIdRepository {
  find(boardId: number): Promise<GoalHistory[] | undefined>;
}
