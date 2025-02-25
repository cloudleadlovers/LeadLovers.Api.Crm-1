export interface IFindCardByBoardIdAndLeadPhoneRepository {
  find(boardId: number, leadPhone: string): Promise<number | undefined>;
}
