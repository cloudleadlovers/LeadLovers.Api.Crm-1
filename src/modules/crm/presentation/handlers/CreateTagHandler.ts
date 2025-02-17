import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTagService from '@modules/crm/application/leadlovers/CreateTagService';
import { createTagInput, createTagOutput } from '../dtos/CreateTagDTO';

export class CreateTagHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createTagService = container.resolve(CreateTagService);

    const input = createTagInput.safeParse({
      userId: Number(request.user.key),
      ...request.body
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const tags = await createTagService.execute(
      input.data.userId,
      input.data.tagName
    );
    const output = createTagOutput.safeParse(tags);
    if (!output.success) {
      return response
        .status(400)
        .json({ status: 'error', result: output.error });
    }
    return response
      .status(200)
      .json({ status: 'success', result: output.data });
  }
}
