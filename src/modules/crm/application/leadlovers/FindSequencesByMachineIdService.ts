import { inject, injectable } from 'tsyringe';

import { Pagination } from '@common/shared/types/Pagination';
import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import { FindSequencesOutput } from '@modules/crm/presentation/dtos/FindSequencesDTO';

@injectable()
export default class FindSequencesByMachineIdService {
  constructor(
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider
  ) {}

  public async execute(
    machineId: number,
    pagination: Pagination
  ): Promise<FindSequencesOutput> {
    const sequences = await this.opportunityProvider.findSequences(
      machineId,
      pagination
    );
    return {
      sequences: sequences.items.map(sequence => {
        return {
          id: sequence.id,
          name: sequence.name
        };
      }),
      pagination: {
        nextCursor: sequences.nextCursor
      }
    };
  }
}
