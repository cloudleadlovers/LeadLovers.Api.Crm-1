import { inject, injectable } from 'tsyringe';

import IInsightFilterProvider, {
  InsightFilter
} from '@modules/dashboard/external/providers/DBProviders/models/IInsightFilterProvider';

@injectable()
export default class FindInsightFiltersByUserIdService {
  constructor(
    @inject('LeadloversInsightFilterProvider')
    private insightFilterProvider: IInsightFilterProvider
  ) {}

  public async execute(userId: number): Promise<InsightFilter[]> {
    return await this.insightFilterProvider.findAllFiltersByUserId(userId);
  }
}
