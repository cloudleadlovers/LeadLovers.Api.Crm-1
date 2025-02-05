export interface IDecrementsCardsPositionByColumnIdAndPositionRepository {
  decrements(columnId: number, position: number): Promise<void>;
}
