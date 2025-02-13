import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindTagsService from '@modules/crm/application/leadlovers/FindTagsService';
import { findTagsOutput } from '../dtos/FindTagsDTO';

export class FindTagsHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findTagsService = container.resolve(FindTagsService);

    const tags = await findTagsService.execute(Number(request.user.key));
    const output = findTagsOutput.safeParse(tags);
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
