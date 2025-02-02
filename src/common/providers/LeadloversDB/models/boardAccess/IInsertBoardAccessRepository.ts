export interface IInsertBoardAccessRepository {
  insert(boardId: number, responsibleId: number, roleId: number): Promise<void>;
}
