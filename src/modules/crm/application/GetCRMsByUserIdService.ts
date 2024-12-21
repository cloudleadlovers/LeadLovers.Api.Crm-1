import { inject, injectable } from 'tsyringe';

import ICRMProvider, {
  CRM,
  FindCRMsFilters
} from '../external/providers/DBProviders/models/ICRMProvider';

@injectable()
export default class GetCRMsByUserIdService {
  constructor(
    @inject('LeadloversCRMProvider')
    private crmProvider: ICRMProvider
  ) {}

  public async execute(
    userId: number,
    filters?: FindCRMsFilters
  ): Promise<CRM[]> {
    return await this.crmProvider.findCRMsByUserId(userId, filters);
  }
}
