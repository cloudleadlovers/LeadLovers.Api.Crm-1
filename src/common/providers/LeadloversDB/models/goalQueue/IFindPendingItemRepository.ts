export type GoalQueue = {
  id: number;
  userId: number;
  boardId: number;
  verifyIn: Date;
};

export interface IFindPendingItemRepository {
  find(boardId: number): Promise<GoalQueue | undefined>;
}
