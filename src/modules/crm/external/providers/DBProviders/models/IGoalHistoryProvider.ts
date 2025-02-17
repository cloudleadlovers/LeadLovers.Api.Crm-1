export type GoalHistory = {
  id: number;
  finishedAt: Date;
};

export default interface IGoalHistoryProvider {
  getLastItemByCrmId(id: number): Promise<GoalHistory | undefined>;
}
