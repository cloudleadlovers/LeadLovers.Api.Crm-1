import { inject, injectable } from 'tsyringe';

import ICRMProvider from '@modules/crm/external/providers/DBProviders/models/ICRMProvider';
import { UpdateCRMInput } from '@modules/crm/presentation/dtos/UpdateCRMDTO';

@injectable()
export default class UpdateCRMService {
  constructor(
    @inject('LeadloversCRMProvider')
    private crmProvider: ICRMProvider
  ) {}

  public async execute(params: UpdateCRMInput): Promise<void> {
    await this.crmProvider.updateCRM({ ...params, id: params.crmId });
  }
}
