import { inject, injectable } from 'tsyringe';

import { Pagination } from '@common/shared/types/Pagination';
import IOpportunityProvider, {
  Contact
} from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';

@injectable()
export default class FindContactsService {
  constructor(
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider
  ) {}

  public async execute(
    userId: number,
    pagination: Pagination,
    contactName?: string
  ): Promise<Contact[]> {
    return await this.opportunityProvider.findContacts(
      userId,
      pagination,
      contactName
    );
  }
}
