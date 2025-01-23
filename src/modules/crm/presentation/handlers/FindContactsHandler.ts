import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindContactsService from '@modules/crm/application/leadlovers/FindContactsService';
import { findContactsInput, findContactsOutput } from '../dtos/FindContactsDTO';

export class FindContactsHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findContactsService = container.resolve(FindContactsService);

    const input = findContactsInput.safeParse({
      userId: Number(request.user.key),
      ...request.query
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const contacts = await findContactsService.execute(
      input.data.userId,
      input.data.pagination,
      input.data.name
    );
    const output = findContactsOutput.safeParse(contacts);
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
