export type InsertBoardParams = {
  usuaSistCodi: number;
  logo: string;
  title: string;
  goal: number;
  rule: 'all-crm' | 'only-one-per-column' | 'only-one-in-crm';
};

export interface IInsertBoardRepository {
  insert(params: InsertBoardParams): Promise<number>;
}
