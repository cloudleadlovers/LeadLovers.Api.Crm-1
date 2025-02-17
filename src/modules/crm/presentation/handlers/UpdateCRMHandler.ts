import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateCRMService from '@modules/crm/application/leadlovers/UpdateCRMService';
import { updateCRMInput } from '../dtos/UpdateCRMDTO';
import UpsertGoalRecurrencyQueueService from '@modules/crm/application/leadlovers/UpsertGoalRecurrencyQueueService';

export class UpdateCRMHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const updateCRMService = container.resolve(UpdateCRMService);
    const upsertGoalRecurrencyQueueService = container.resolve(
      UpsertGoalRecurrencyQueueService
    );

    const input = updateCRMInput.safeParse({
      userId: Number(request.user.key),
      ...request.params,
      ...request.body
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    await updateCRMService.execute(input.data);
    await upsertGoalRecurrencyQueueService.execute({
      crmId: input.data.crmId,
      userId: Number(request.user.key),
      ...request.body
    });
    return response.status(201).json({ status: 'success', result: {} });
  }
}
