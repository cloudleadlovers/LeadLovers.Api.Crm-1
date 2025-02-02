import { inject, injectable } from 'tsyringe';

import { LogText } from '@common/shared/enums/LogText';
import IStageProvider from '@modules/crm/external/providers/DBProviders/models/IStageProvider';
import { UpdateStageInput } from '@modules/crm/presentation/dtos/UpdateStageDTO';

@injectable()
export default class UpdateStageService {
  constructor(
    @inject('LeadloversStageProvider')
    private stageProvider: IStageProvider
  ) {}

  public async execute(params: UpdateStageInput): Promise<void> {
    if (params.name) {
      await this.ensureUniqueStageName(params.crmId, params.name);
    }
    await this.stageProvider.updateStage({ ...params, id: params.stageId });
    const stageName = await this.getStageName(params.stageId);
    await this.stageProvider.logStageUpdating(params.stageId, params.userId, {
      text: LogText.StageUpdated,
      args: [stageName, params.userEmail]
    });
  }

  private async ensureUniqueStageName(
    crmId: number,
    name: string
  ): Promise<void> {
    const stage = await this.stageProvider.findStageByName(crmId, name);
    if (stage) {
      throw new Error(
        `Cannot update stage. The name '${name}' is already in use.`
      );
    }
  }

  private async getStageName(stageId: number): Promise<string> {
    const stage = await this.stageProvider.findStage(stageId);
    if (!stage) throw new Error(`Stage not found.`);
    return stage.name;
  }
}
