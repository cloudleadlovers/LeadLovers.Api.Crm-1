export type BoardAccess = {
  boardId: number;
  userId: number;
  userName: string;
  userPhoto: string;
  accessId: number;
};

export interface IFindBoardAccessByBoardIdRepository {
  find(boardId: number): Promise<BoardAccess[]>;
}
