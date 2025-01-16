import { inject, injectable } from 'tsyringe';

import { LogText } from '@common/shared/enums/LogText';
import IStageProvider from '@modules/crm/external/providers/DBProviders/models/IStageProvider';
import {
  CreateStageInput,
  CreateStageOutput
} from '@modules/crm/presentation/dtos/CreateStageDTO';

@injectable()
export default class CreateStageService {
  constructor(
    @inject('LeadloversStageProvider')
    private stageProvider: IStageProvider
  ) {}

  public async execute(params: CreateStageInput): Promise<CreateStageOutput> {
    await this.ensureUniqueStageName(params.crmId, params.name);
    const stage = await this.stageProvider.createStage(params);
    await this.stageProvider.logStageCreation(stage.id, params.userId, {
      text: LogText.StageCreated,
      args: [params.name, params.userEmail]
    });

    return { id: stage.id };
  }

  private async ensureUniqueStageName(
    crmId: number,
    name: string
  ): Promise<void> {
    const stage = await this.stageProvider.findStageByName(crmId, name);
    if (stage) {
      throw new Error(
        `Cannot create stage. The name '${name}' is already in use.`
      );
    }
  }
}
