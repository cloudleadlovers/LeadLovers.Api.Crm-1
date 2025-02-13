import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TagContactsService from '@modules/crm/application/leadlovers/TagContactsService';
import { tagContactsInput } from '../dtos/TagContactsDTO';

export class TagContactsHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const tagContactsService = container.resolve(TagContactsService);

    const input = tagContactsInput.safeParse({
      userId: Number(request.user.key),
      ...request.body
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    await tagContactsService.execute(input.data);
    return response.status(204).json({ status: 'success', result: {} });
  }
}
