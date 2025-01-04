import { inject, injectable } from 'tsyringe';

import IInsightFilterProvider from '@modules/dashboard/external/providers/DBProviders/models/IInsightFilterProvider';

@injectable()
export default class DeleteInsightFilterService {
  constructor(
    @inject('LeadloversInsightFilterProvider')
    private insightFilterProvider: IInsightFilterProvider
  ) {}

  public async execute(filterId: number): Promise<void> {
    await this.insightFilterProvider.deleteFilter(filterId);
  }
}
