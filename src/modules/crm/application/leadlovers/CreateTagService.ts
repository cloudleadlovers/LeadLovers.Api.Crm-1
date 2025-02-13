import { inject, injectable } from 'tsyringe';

import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import { CreateTagOutput } from '@modules/crm/presentation/dtos/CreateTagDTO';

@injectable()
export default class CreateTagService {
  constructor(
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider
  ) {}

  public async execute(
    userId: number,
    tagName: string
  ): Promise<CreateTagOutput> {
    const tag = await this.opportunityProvider.findTagByName(userId, tagName);
    if (tag) throw new Error('Tag already exists.');
    return await this.opportunityProvider.createTag(userId, tagName);
  }
}
