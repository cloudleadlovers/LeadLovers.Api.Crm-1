import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContactService from '@modules/crm/application/leadlovers/CreateContactService';
import CreateOpportunityService from '@modules/crm/application/leadlovers/CreateOpportunityService';
import {
  createOpportunityInput,
  createOpportunityOutput
} from '../dtos/CreateOpportunityDTO';

export class CreateOpportunityHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createContactService = container.resolve(CreateContactService);
    const createOpportunityService = container.resolve(
      CreateOpportunityService
    );

    //TO-DO: verificar se é um usuario ou subusuario
    const input = createOpportunityInput.safeParse({
      userId: Number(request.user.key),
      ...request.body,
      ...request.params
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    if (!input.data.contactId) {
      input.data.contactId = await createContactService.execute(input.data);
    }
    const opportunity = await createOpportunityService.execute(input.data);
    const output = createOpportunityOutput.safeParse(opportunity);
    if (!output.success) {
      return response
        .status(400)
        .json({ status: 'error', result: output.error });
    }
    return response
      .status(201)
      .json({ status: 'success', result: output.data });
  }
}
