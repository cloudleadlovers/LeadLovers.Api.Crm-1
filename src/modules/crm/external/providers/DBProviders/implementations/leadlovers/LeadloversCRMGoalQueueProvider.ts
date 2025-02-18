import { inject, injectable } from 'tsyringe';

import ICRMGoalQueueProvider, {
  GoalQueue
} from '@modules/crm/external/providers/DBProviders/models/ICRMGoalQueueProvider';
import { IDeletePendingItemsRepository } from '@common/providers/LeadloversDB/models/goalQueue/IDeletePendingItemsRepository';
import { IFindPendingItemRepository } from '@common/providers/LeadloversDB/models/goalQueue/IFindPendingItemRepository';
import { IUpdateVerifyDateRepository } from '@common/providers/LeadloversDB/models/goalQueue/IUpdateVerifyDateRepository';
import { IInsertGoalQueueRepository } from '@common/providers/LeadloversDB/models/goalQueue/IInsertGoalQueueRepository';

@injectable()
export default class LeadloversCRMGoalQueueProvider
  implements ICRMGoalQueueProvider
{
  constructor(
    @inject('InsertGoalQueueRepository')
    private insertGoalQueueRepository: IInsertGoalQueueRepository,

    @inject('DeletePendingItemsRepository')
    private deletePendingItemsRepository: IDeletePendingItemsRepository,

    @inject('FindPendingItemRepository')
    private findPendingItemRepository: IFindPendingItemRepository,

    @inject('UpdateVerifyDateRepository')
    private updateVerifyDateRepository: IUpdateVerifyDateRepository
  ) {}

  public async create(
    params: Pick<GoalQueue, 'userId' | 'crmId' | 'verifyIn'>
  ): Promise<void> {
    await this.insertGoalQueueRepository.insert({
      userId: params.userId,
      boardId: params.crmId,
      verifyIn: params.verifyIn
    });
  }

  public async deleteByCrmId(id: number): Promise<void> {
    await this.deletePendingItemsRepository.delete(id);
  }

  public async getPendingItemByCrmId(
    id: number
  ): Promise<GoalQueue | undefined> {
    const queue = await this.findPendingItemRepository.find(id);

    if (!queue) return undefined;

    return {
      id: queue.id,
      userId: queue.userId,
      crmId: queue.boardId,
      verifyIn: queue.verifyIn
    };
  }

  public async updateVerifyDateById(id: number, verifyIn: Date): Promise<void> {
    await this.updateVerifyDateRepository.update(id, verifyIn);
  }
}
