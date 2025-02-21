export type GoalnRecurrencyQueue = {
  id: number;
  userId: number;
  boardId: number;
  verifyIn: Date;
};

export interface IFindPendingGoalInRecurrencyQueueRepository {
  find(boardId: number): Promise<GoalnRecurrencyQueue | undefined>;
}
