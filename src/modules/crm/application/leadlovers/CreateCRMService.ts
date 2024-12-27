import { inject, injectable } from 'tsyringe';

import { CreateCRMInput } from '@modules/crm/presentation/dtos/CreateCRMDTO';
import ICRMProvider, {
  CRM
} from '../../external/providers/DBProviders/models/ICRMProvider';

type CreateCRMParams = {
  userId: number;
} & CreateCRMInput;

@injectable()
export default class CreateCRMService {
  constructor(
    @inject('LeadloversCRMProvider')
    private crmProvider: ICRMProvider
  ) {}

  public async execute(params: CreateCRMParams): Promise<Pick<CRM, 'id'>> {
    const crm = await this.crmProvider.createCRM(params);
    await Promise.all(
      params.owners.map(owner =>
        this.crmProvider.assignOwnerToCRM(crm.id, owner.id, owner.roleId)
      )
    );
    await Promise.all(
      params.stages.map(stage =>
        this.crmProvider.createCRMStage({ crmId: crm.id, ...stage })
      )
    );
    return { id: crm.id };
  }
}
