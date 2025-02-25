export type GoalQueue = {
  id: number;
  userId: number;
  crmId: number;
  verifyIn: Date;
};

export default interface ICRMGoalQueueProvider {
  createGoal(
    params: Pick<GoalQueue, 'userId' | 'crmId' | 'verifyIn'>
  ): Promise<void>;
  deletePendingGoalsByCrmId(crmId: number): Promise<void>;
  findPendingGoalByCrmId(crmId: number): Promise<GoalQueue | undefined>;
  updateGoalVerifyDate(id: number, verifyIn: Date): Promise<void>;
}
