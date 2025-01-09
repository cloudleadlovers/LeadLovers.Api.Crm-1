import { inject, injectable } from 'tsyringe';

import ICRMProvider, {
  CRMOwner
} from '../../external/providers/DBProviders/models/ICRMProvider';

@injectable()
export default class FindPotentialOwnersByUserIdService {
  constructor(
    @inject('LeadloversCRMProvider')
    private crmProvider: ICRMProvider
  ) {}

  public async execute(
    userId: number
  ): Promise<Pick<CRMOwner, 'id' | 'name' | 'photo'>[]> {
    return await this.crmProvider.findPotentialOwnersByUserId(userId);
  }
}
