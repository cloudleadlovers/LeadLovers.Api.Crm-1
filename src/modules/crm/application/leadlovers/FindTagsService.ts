import { inject, injectable } from 'tsyringe';

import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import { FindTagsOutput } from '@modules/crm/presentation/dtos/FindTagsDTO';

@injectable()
export default class FindTagsService {
  constructor(
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider
  ) {}

  public async execute(userId: number): Promise<FindTagsOutput> {
    return await this.opportunityProvider.findTagsByUserId(userId);
  }
}
