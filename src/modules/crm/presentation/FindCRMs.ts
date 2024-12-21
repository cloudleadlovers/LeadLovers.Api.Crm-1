import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetCRMsByUserIdService from '../application/GetCRMsByUserIdService';
import { findCRMsIntput, findCRMsOutput } from './dtos/FindCRMsDTO';

export class FindCRMs {
  public async handle(request: Request, response: Response): Promise<Response> {
    const getCRMsByUserIdService = container.resolve(GetCRMsByUserIdService);

    const input = findCRMsIntput.safeParse({
      userId: Number(request.user.key),
      filters: request.query
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const crms = await getCRMsByUserIdService.execute(
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
