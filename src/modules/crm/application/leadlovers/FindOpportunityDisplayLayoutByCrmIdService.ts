import { inject, injectable } from 'tsyringe';

import { FindOpportunityDisplayLayoutOutput } from '@modules/crm/presentation/dtos/FindOpportunityDisplayLayoutDTO';
import ICRMProvider from '../../external/providers/DBProviders/models/ICRMProvider';

@injectable()
export default class FindOpportunityDisplayLayoutByCrmIdService {
  constructor(
    @inject('LeadloversCRMProvider')
    private crmProvider: ICRMProvider
  ) {}

  public async execute(
    crmId: number
  ): Promise<FindOpportunityDisplayLayoutOutput | undefined> {
    return await this.crmProvider.findOpportunityDisplayLayoutByCrmId(crmId);
  }
}
