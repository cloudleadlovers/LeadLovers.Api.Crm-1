import { inject, injectable } from 'tsyringe';

import { LogText } from '@common/shared/enums/LogText';
import IStageProvider from '@modules/crm/external/providers/DBProviders/models/IStageProvider';
import {
  CreateCRMInput,
  CreateCRMOutput
} from '@modules/crm/presentation/dtos/CreateCRMDTO';
import ICRMProvider from '../../external/providers/DBProviders/models/ICRMProvider';

@injectable()
export default class CreateCRMService {
  constructor(
    @inject('LeadloversCRMProvider')
    private crmProvider: ICRMProvider,
    @inject('LeadloversStageProvider')
    private stageProvider: IStageProvider
  ) {}

  public async execute(params: CreateCRMInput): Promise<CreateCRMOutput> {
    const crm = await this.crmProvider.createCRM(params);
    await this.crmProvider.logCRMCreation(crm.id, params.userId, {
      text: LogText.CRMCreated,
      args: [params.name, params.userEmail]
    });
    await Promise.all(
      params.owners.map(owner =>
        this.crmProvider.assignOwnerToCRM(crm.id, owner.id, owner.roleId)
      )
    );
    await Promise.all(
      params.stages.map(async stage => {
        const { id } = await this.stageProvider.createStage({
          crmId: crm.id,
          ...stage
        });
        await this.stageProvider.logStageCreation(id, params.userId, {
          text: LogText.StageCreated,
          args: [stage.name, params.userEmail]
        });
      })
    );
    return { id: crm.id };
  }
}
