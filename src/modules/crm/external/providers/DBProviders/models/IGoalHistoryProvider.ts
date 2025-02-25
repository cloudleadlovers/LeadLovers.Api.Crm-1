export type GoalHistory = {
  id: number;
  goal: number;
  achieved: number;
  startedAt: Date;
  finishedAt: Date;
};

export default interface IGoalHistoryProvider {
  findGoalHistoryByCrmId(crmId: number): Promise<GoalHistory[]>;
  findLastGoalHistoryByCrmId(
    crmId: number
  ): Promise<Pick<GoalHistory, 'id' | 'finishedAt'> | undefined>;
}
