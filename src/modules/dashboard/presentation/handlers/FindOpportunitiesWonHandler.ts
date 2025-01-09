import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindOpportunitiesWonByCRMIdService from '@modules/dashboard/application/leadlovers/FindOpportunitiesWonByCRMIdService';
import {
  findOpportunitiesWonIntput,
  findOpportunitiesWonOutput
} from '../dtos/FindOpportunitiesWonDTO';

export class FindOpportunitiesWonHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findOpportunitiesWonByCRMIdService = container.resolve(
      FindOpportunitiesWonByCRMIdService
    );

    const input = findOpportunitiesWonIntput.safeParse({
      ...request.query,
      ...request.params
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const opportunities = await findOpportunitiesWonByCRMIdService.execute(
      input.data.crmId,
      input.data.filters
    );
    const output = findOpportunitiesWonOutput.safeParse(opportunities);
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
