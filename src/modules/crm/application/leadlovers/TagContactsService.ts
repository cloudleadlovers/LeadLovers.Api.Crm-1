import { inject, injectable } from 'tsyringe';

import { IFindLeadUsuaSistByLeadCodiRepository } from '@common/providers/LeadloversDB/models/leadUsuaSists/IFindLeadUsuaSistByLeadCodiRepository';
import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import { TagContactsInput } from '@modules/crm/presentation/dtos/TagContactsDTO';

@injectable()
export default class TagContactsService {
  constructor(
    @inject('FindLeadUsuaSistByLeadCodiRepository')
    private findLeadUsuaSistByLeadCodiRepository: IFindLeadUsuaSistByLeadCodiRepository,
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider
  ) {}

  public async execute(params: TagContactsInput): Promise<void> {
    await Promise.all(
      params.contactIds.map(async contactId => {
        const leadUsuaSist =
          await this.findLeadUsuaSistByLeadCodiRepository.find(
            contactId,
            params.userId
          );
        if (!leadUsuaSist) throw new Error('Contact not found.');
        await Promise.all(
          params.tagIds.map(async tagId => {
            await this.opportunityProvider.tagContact(leadUsuaSist.id, tagId);
          })
        );
      })
    );
  }
}
