export interface IUpdateGoalRecurrencyVerifyDateRepository {
  update(id: number, verifyIn: Date): Promise<void>;
}
