import { inject, injectable } from 'tsyringe';

import IGoalHistoryProvider, {
  GoalHistory
} from '../../models/IGoalHistoryProvider';
import { IFindLastItemRepository } from '@common/providers/LeadloversDB/models/goalHistory/IFindLastItemRepository';
import { IFindByBoardIdRepository } from '@common/providers/LeadloversDB/models/goalHistory/IFindByBoardIdRepository';

@injectable()
export default class LeadloversGoalHistoryProvider
  implements IGoalHistoryProvider
{
  constructor(
    @inject('FindLastItemRepository')
    private findLastItemRepository: IFindLastItemRepository,

    @inject('FindByBoardIdRepository')
    private findByBoardIdRepository: IFindByBoardIdRepository
  ) {}
  public async getByCrmId(id: number): Promise<GoalHistory[]> {
    return await this.findByBoardIdRepository.find(id);
  }

  public async getLastItemByCrmId(
    id: number
  ): Promise<Pick<GoalHistory, 'id' | 'finishedAt'> | undefined> {
    const lastItem = await this.findLastItemRepository.find(id);

    if (!lastItem) return lastItem;

    return {
      id: lastItem.id,
      finishedAt: lastItem.finishedAt
    };
  }
}
