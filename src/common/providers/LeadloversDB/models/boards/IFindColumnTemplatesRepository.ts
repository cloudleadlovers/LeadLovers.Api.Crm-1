export type ColumnTemplate = {
  boardId: number;
  boardTitle: string;
  columnId: number;
  columnTitle: string;
  columnColor: string;
  columnOrder: number;
};

export interface IFindColumnTemplatesRepository {
  find(): Promise<ColumnTemplate[]>;
}
