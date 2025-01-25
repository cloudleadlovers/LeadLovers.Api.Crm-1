import { inject, injectable } from 'tsyringe';

import { Pagination } from '@common/shared/types/Pagination';
import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import { FindMachinesOutput } from '@modules/crm/presentation/dtos/FindMachinesDTO';

@injectable()
export default class FindMachinesByUserIdService {
  constructor(
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider
  ) {}

  public async execute(
    userId: number,
    pagination: Pagination
  ): Promise<FindMachinesOutput> {
    const machines = await this.opportunityProvider.findMachines(
      userId,
      pagination
    );
    return {
      machines: machines.items.map(machine => {
        return {
          id: machine.id,
          name: machine.name
        };
      }),
      pagination: {
        nextCursor: machines.nextCursor
      }
    };
  }
}
