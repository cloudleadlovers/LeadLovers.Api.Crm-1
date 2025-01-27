export interface IFindCardByBoardIdAndLeadCodiRepository {
  find(boardId: number, leadCodi: number): Promise<number | undefined>;
}
