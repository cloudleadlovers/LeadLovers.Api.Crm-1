export type InsertGoalQueueParams = {
  userId: number;
  boardId: number;
  verifyIn: Date;
};

export interface IInsertGoalQueueRepository {
  insert(params: InsertGoalQueueParams): Promise<void>;
}
