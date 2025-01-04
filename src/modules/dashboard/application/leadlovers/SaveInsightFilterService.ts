import { inject, injectable } from 'tsyringe';

import IInsightFilterProvider, {
  FiltersJSON
} from '@modules/dashboard/external/providers/DBProviders/models/IInsightFilterProvider';

type Params = {
  userId: number;
  name: string;
  filters: FiltersJSON;
};

@injectable()
export default class SaveInsightFilterService {
  constructor(
    @inject('LeadloversInsightFilterProvider')
    private insightFilterProvider: IInsightFilterProvider
  ) {}

  public async execute(params: Params): Promise<number> {
    return await this.insightFilterProvider.createFilter(params);
  }
}
