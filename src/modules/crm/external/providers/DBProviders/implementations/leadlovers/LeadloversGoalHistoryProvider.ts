import { inject, injectable } from 'tsyringe';

import IGoalHistoryProvider, {
  GoalHistory
} from '../../models/IGoalHistoryProvider';
import { IFindLastItemRepository } from '@common/providers/LeadloversDB/models/goalHistory/IFindLastItemRepository';

@injectable()
export default class LeadloversGoalHistoryProvider
  implements IGoalHistoryProvider
{
  constructor(
    @inject('FindLastItemRepository')
    private findLastItemRepository: IFindLastItemRepository
  ) {}

  public async getLastItemByCrmId(
    id: number
  ): Promise<GoalHistory | undefined> {
    const lastItem = await this.findLastItemRepository.find(id);

    if (!lastItem) return lastItem;

    return {
      id: lastItem.id,
      finishedAt: lastItem.finishedAt
    };
  }
}
