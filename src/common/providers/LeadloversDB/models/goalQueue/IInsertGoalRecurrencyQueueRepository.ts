export type InsertGoalRecurrencyQueueParams = {
  userId: number;
  boardId: number;
  verifyIn: Date;
};

export interface IInsertGoalRecurrencyQueueRepository {
  insert(params: InsertGoalRecurrencyQueueParams): Promise<void>;
}
