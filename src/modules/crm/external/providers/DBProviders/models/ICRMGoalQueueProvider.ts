export type GoalQueue = {
  id: number;
  userId: number;
  crmId: number;
  verifyIn: Date;
};

export default interface ICRMGoalQueueProvider {
  create(
    params: Pick<GoalQueue, 'userId' | 'crmId' | 'verifyIn'>
  ): Promise<void>;
  deleteByCrmId(id: number): Promise<void>;
  getPendingItemByCrmId(id: number): Promise<GoalQueue | undefined>;
  updateVerifyDateById(id: number, verifyIn: Date): Promise<void>;
}
