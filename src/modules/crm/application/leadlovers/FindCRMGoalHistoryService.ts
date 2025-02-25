import { inject, injectable } from 'tsyringe';

import IGoalHistoryProvider from '@modules/crm/external/providers/DBProviders/models/IGoalHistoryProvider';
import { FindCRMGoalHistoryOutput } from '@modules/crm/presentation/dtos/FindCRMGoalHistoryDTO';

@injectable()
export default class FindCRMGoalHistoryService {
  constructor(
    @inject('LeadloversGoalHistoryProvider')
    private goalHistoryProvider: IGoalHistoryProvider
  ) {}

  public async execute(crmId: number): Promise<FindCRMGoalHistoryOutput> {
    return this.goalHistoryProvider.findGoalHistoryByCrmId(crmId);
  }
}
