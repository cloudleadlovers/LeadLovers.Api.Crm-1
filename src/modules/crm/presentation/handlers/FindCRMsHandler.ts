import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindCRMsByUserIdService from '../../application/leadlovers/FindCRMsByUserIdService';
import { findCRMsIntput, findCRMsOutput } from '../dtos/FindCRMsDTO';

export class FindCRMsHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findCRMsByUserIdService = container.resolve(FindCRMsByUserIdService);

    const input = findCRMsIntput.safeParse({
      userId: Number(request.user.key),
      filters: request.query
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const crms = await findCRMsByUserIdService.execute(
      input.data.userId,
      input.data.filters
    );
    const output = findCRMsOutput.safeParse(crms);
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
