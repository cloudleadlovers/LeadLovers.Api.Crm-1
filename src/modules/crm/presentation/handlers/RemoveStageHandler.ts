import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RemoveStageService from '@modules/crm/application/leadlovers/RemoveStageService';
import { removeStageInput } from '../dtos/RemoveStageDTO';

export class RemoveStageHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const removeStageService = container.resolve(RemoveStageService);

    const input = removeStageInput.safeParse({
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
    await removeStageService.execute(input.data);
    return response.status(204).json({ status: 'success', result: {} });
  }
}
