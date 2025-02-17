export interface IUpdateColumnAndPositionCardRepository {
  update(
    cardId: number,
    newColumnId: number,
    newPosition: number
  ): Promise<void>;
}
