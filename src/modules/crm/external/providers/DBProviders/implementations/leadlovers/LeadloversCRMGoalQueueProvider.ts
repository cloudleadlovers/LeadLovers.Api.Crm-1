import { inject, injectable } from 'tsyringe';

import { IDeletePendingIGoalsInRecurrencyQueueRepository } from '@common/providers/LeadloversDB/models/goalQueue/IDeletePendingIGoalsInRecurrencyQueueRepository';
import { IFindPendingGoalInRecurrencyQueueRepository } from '@common/providers/LeadloversDB/models/goalQueue/IFindPendingGoalInRecurrencyQueueRepository';
import { IInsertGoalRecurrencyQueueRepository } from '@common/providers/LeadloversDB/models/goalQueue/IInsertGoalRecurrencyQueueRepository';
import { IUpdateGoalRecurrencyVerifyDateRepository } from '@common/providers/LeadloversDB/models/goalQueue/IUpdateGoalRecurrencyVerifyDateRepository';
import ICRMGoalQueueProvider, {
  GoalQueue
} from '@modules/crm/external/providers/DBProviders/models/ICRMGoalQueueProvider';

@injectable()
export default class LeadloversCRMGoalQueueProvider
  implements ICRMGoalQueueProvider
{
  constructor(
    @inject('DeletePendingIGoalsInRecurrencyQueueRepository')
    private deletePendingIGoalsInRecurrencyQueueRepository: IDeletePendingIGoalsInRecurrencyQueueRepository,
    @inject('FindPendingGoalInRecurrencyQueueRepository')
    private findPendingGoalInRecurrencyQueueRepository: IFindPendingGoalInRecurrencyQueueRepository,
    @inject('InsertGoalRecurrencyQueueRepository')
    private insertGoalRecurrencyQueueRepository: IInsertGoalRecurrencyQueueRepository,
    @inject('UpdateGoalRecurrencyVerifyDateRepository')
    private updateGoalRecurrencyVerifyDateRepository: IUpdateGoalRecurrencyVerifyDateRepository
  ) {}

  public async createGoal(
    params: Pick<GoalQueue, 'userId' | 'crmId' | 'verifyIn'>
  ): Promise<void> {
    await this.insertGoalRecurrencyQueueRepository.insert({
      userId: params.userId,
      boardId: params.crmId,
      verifyIn: params.verifyIn
    });
  }

  public async deletePendingGoalsByCrmId(crmId: number): Promise<void> {
    await this.deletePendingIGoalsInRecurrencyQueueRepository.delete(crmId);
  }

  public async findPendingGoalByCrmId(
    crmId: number
  ): Promise<GoalQueue | undefined> {
    const goal =
      await this.findPendingGoalInRecurrencyQueueRepository.find(crmId);

    if (!goal) return undefined;

    return {
      id: goal.id,
      userId: goal.userId,
      crmId: goal.boardId,
      verifyIn: goal.verifyIn
    };
  }

  public async updateGoalVerifyDate(id: number, verifyIn: Date): Promise<void> {
    await this.updateGoalRecurrencyVerifyDateRepository.update(id, verifyIn);
  }
}
