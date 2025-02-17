import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCRMService from '@modules/crm/application/leadlovers/CreateCRMService';
import { createCRMInput, createCRMOutput } from '../dtos/CreateCRMDTO';
import UpsertGoalRecurrencyQueueService from '@modules/crm/application/leadlovers/UpsertGoalRecurrencyQueueService';

export class CreateCRMHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createCRMService = container.resolve(CreateCRMService);
    const upsertGoalRecurrencyQueueService = container.resolve(
      UpsertGoalRecurrencyQueueService
    );

    const input = createCRMInput.safeParse({
      userId: Number(request.user.key),
      userEmail: request.user.email,
      ...request.body
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const crm = await createCRMService.execute(input.data);
    await upsertGoalRecurrencyQueueService.execute({
      crmId: crm.id,
      userId: Number(request.user.key),
      ...request.body
    });
    const output = createCRMOutput.safeParse(crm);
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
