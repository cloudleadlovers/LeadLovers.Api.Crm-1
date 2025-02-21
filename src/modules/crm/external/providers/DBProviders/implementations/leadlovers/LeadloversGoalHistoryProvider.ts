import { inject, injectable } from 'tsyringe';

import { IFindGoalHistoriesByBoardIdRepository } from '@common/providers/LeadloversDB/models/goalHistory/IFindGoalHistoriesByBoardIdRepository';
import { IFindLastGoalHistoryRepository } from '@common/providers/LeadloversDB/models/goalHistory/IFindLastGoalHistoryRepository';
import IGoalHistoryProvider, {
  GoalHistory
} from '../../models/IGoalHistoryProvider';

@injectable()
export default class LeadloversGoalHistoryProvider
  implements IGoalHistoryProvider
{
  constructor(
    @inject('FindGoalHistoriesByBoardIdRepository')
    private findGoalHistoriesByBoardIdRepository: IFindGoalHistoriesByBoardIdRepository,
    @inject('FindLastGoalHistoryRepository')
    private findLastGoalHistoryRepository: IFindLastGoalHistoryRepository
  ) {}
  public async findGoalHistoryByCrmId(crmId: number): Promise<GoalHistory[]> {
    return await this.findGoalHistoriesByBoardIdRepository.find(crmId);
  }

  public async findLastGoalHistoryByCrmId(
    crmId: number
  ): Promise<Pick<GoalHistory, 'id' | 'finishedAt'> | undefined> {
    const lastGoal = await this.findLastGoalHistoryRepository.find(crmId);
    if (!lastGoal) return lastGoal;
    return {
      id: lastGoal.id,
      finishedAt: lastGoal.finishedAt
    };
  }
}
