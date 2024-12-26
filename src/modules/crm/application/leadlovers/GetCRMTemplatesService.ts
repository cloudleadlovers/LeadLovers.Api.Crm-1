import { inject, injectable } from 'tsyringe';

import ICRMProvider, {
  CRMTemplate
} from '../../external/providers/DBProviders/models/ICRMProvider';

@injectable()
export default class GetCRMTemplatesService {
  constructor(
    @inject('LeadloversCRMProvider')
    private crmProvider: ICRMProvider
  ) {}

  public async execute(): Promise<CRMTemplate[]> {
    return await this.crmProvider.findCRMTemplates();
  }
}
