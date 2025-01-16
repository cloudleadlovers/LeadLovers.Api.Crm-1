import { inject, injectable } from 'tsyringe';

import IStageProvider, {
  StageTemplate
} from '@modules/crm/external/providers/DBProviders/models/IStageProvider';

@injectable()
export default class FindStageTemplatesService {
  constructor(
    @inject('LeadloversStageProvider')
    private stageProvider: IStageProvider
  ) {}

  public async execute(): Promise<StageTemplate[]> {
    return await this.stageProvider.findStageTemplates();
  }
}
