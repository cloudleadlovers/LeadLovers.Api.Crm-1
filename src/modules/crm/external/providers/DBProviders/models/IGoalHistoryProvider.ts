export type GoalHistory = {
  id: number;
  goal: number;
  achieved: number;
  startedAt: Date;
  finishedAt: Date;
};

export default interface IGoalHistoryProvider {
  getLastItemByCrmId(
    id: number
  ): Promise<Pick<GoalHistory, 'id' | 'finishedAt'> | undefined>;
  getByCrmId(id: number): Promise<GoalHistory[]>;
}
