import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCRMService from '@modules/crm/application/leadlovers/CreateCRMService';
import { createCRMInput } from '../dtos/CreateCRMDTO';

export class CreateCRMHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createCRMService = container.resolve(CreateCRMService);

    const userId = Number(request.user.key);
    const input = createCRMInput.safeParse(request.body);
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const crm = await createCRMService.execute({ userId, ...input.data });
    return response.status(201).json({ status: 'success', result: crm });
  }
}
