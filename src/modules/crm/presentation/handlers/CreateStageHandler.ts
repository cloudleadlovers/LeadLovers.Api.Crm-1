import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStageService from '@modules/crm/application/leadlovers/CreateStageService';
import { createStageInput, createStageOutput } from '../dtos/CreateStageDTO';

export class CreateStageHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createStageService = container.resolve(CreateStageService);

    const input = createStageInput.safeParse({
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
    const stage = await createStageService.execute(input.data);
    const output = createStageOutput.safeParse(stage);
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
