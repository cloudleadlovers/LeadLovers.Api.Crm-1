import { inject, injectable } from 'tsyringe';

import { Pagination } from '@common/shared/types/Pagination';
import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import { FindContactsOutput } from '@modules/crm/presentation/dtos/FindContactsDTO';

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
  ): Promise<FindContactsOutput> {
    const contacts = await this.opportunityProvider.findContacts(
      userId,
      pagination,
      contactName
    );
    return {
      contacts: contacts.items.map(contact => {
        return {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          company: contact.company,
          state: contact.state,
          city: contact.city,
          createdAt: contact.createdAt
        };
      }),
      pagination: {
        nextCursor: contacts.nextCursor
      }
    };
  }
}
