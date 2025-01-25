import { inject, injectable } from 'tsyringe';

import { MachineType } from '@common/shared/enums/MachineType';
import { Pagination } from '@common/shared/types/Pagination';
import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import { FindMessagesOutput } from '@modules/crm/presentation/dtos/FindMessagesDTO';

@injectable()
export default class FindMessagesBySequenceIdService {
  constructor(
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider
  ) {}

  public async execute(
    machineType: MachineType,
    sequenceId: number,
    pagination: Pagination
  ): Promise<FindMessagesOutput> {
    const messages = await this.opportunityProvider.findMessages(
      machineType,
      sequenceId,
      pagination
    );
    return {
      messages: messages.items.map(message => {
        return {
          id: message.id,
          name: message.name
        };
      }),
      pagination: {
        nextCursor: messages.nextCursor
      }
    };
  }
}
