import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateCRMService from '@modules/crm/application/leadlovers/UpdateCRMService';
import { updateCRMInput } from '../dtos/UpdateCRMDTO';

export class UpdateCRMHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const updateCRMService = container.resolve(UpdateCRMService);

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
    return response.status(204).json({ status: 'success', result: {} });
  }
}
