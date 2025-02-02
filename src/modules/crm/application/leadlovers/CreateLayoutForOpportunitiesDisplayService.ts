import { inject, injectable } from 'tsyringe';

import { CreateLayoutForOpportunitiesDisplayInput } from '@modules/crm/presentation/dtos/CreateLayoutForOpportunitiesDisplayDTO';
import ICRMProvider from '../../external/providers/DBProviders/models/ICRMProvider';

@injectable()
export default class CreateLayoutForOpportunitiesDisplayService {
  constructor(
    @inject('LeadloversCRMProvider')
    private crmProvider: ICRMProvider
  ) {}

  public async execute(
    params: CreateLayoutForOpportunitiesDisplayInput
  ): Promise<void> {
    await this.crmProvider.createLayoutForOpportunitiesDisplay(
      params.crmId,
      params.layout
    );
  }
}
