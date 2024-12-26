export type BoardTemplate = {
  boardId: number;
  boardTitle: string;
  columnId: number;
  columnTitle: string;
  columnColor: string;
  columnOrder: number;
};

export interface IFindBoardTemplatesRepository {
  find(): Promise<BoardTemplate[]>;
}
