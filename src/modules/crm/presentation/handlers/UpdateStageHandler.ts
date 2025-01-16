import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateStageService from '@modules/crm/application/leadlovers/UpdateStageService';
import { updateStageInput } from '../dtos/UpdateStageDTO';

export class UpdateStageHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const updateStageService = container.resolve(UpdateStageService);

    const input = updateStageInput.safeParse({
      userId: Number(request.user.key),
      userEmail: request.user.email,
      ...request.params,
      ...request.body
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    await updateStageService.execute(input.data);
    return response.status(201).json({ status: 'success', result: {} });
  }
}
