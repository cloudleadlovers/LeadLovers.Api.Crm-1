export interface IUpdateVerifyDateRepository {
  update(id: number, verifyIn: Date): Promise<void>;
}
