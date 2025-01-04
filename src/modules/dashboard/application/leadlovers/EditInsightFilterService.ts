import { inject, injectable } from 'tsyringe';

import IInsightFilterProvider, {
  FiltersJSON
} from '@modules/dashboard/external/providers/DBProviders/models/IInsightFilterProvider';

type Params = {
  id: number;
  name?: string;
  filters?: FiltersJSON;
};

@injectable()
export default class EditInsightFilterService {
  constructor(
    @inject('LeadloversInsightFilterProvider')
    private insightFilterProvider: IInsightFilterProvider
  ) {}

  public async execute(params: Params): Promise<void> {
    await this.insightFilterProvider.editFilter(params);
  }
}
