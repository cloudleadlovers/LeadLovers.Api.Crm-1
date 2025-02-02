import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindOpportunityDisplayLayoutByCrmIdService from '@modules/crm/application/leadlovers/FindOpportunityDisplayLayoutByCrmIdService';
import {
  findOpportunityDisplayLayoutInput,
  findOpportunityDisplayLayoutOutput
} from '../dtos/FindOpportunityDisplayLayoutDTO';

export class FindOpportunityDisplayLayoutHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findOpportunityDisplayLayoutByCrmIdService = container.resolve(
      FindOpportunityDisplayLayoutByCrmIdService
    );

    const input = findOpportunityDisplayLayoutInput.safeParse({
      ...request.params
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const result = await findOpportunityDisplayLayoutByCrmIdService.execute(
      input.data.crmId
    );
    if (!result) {
      return response
        .status(404)
        .json({ status: 'error', result: 'LAYOUT NOT FOUND' });
    }
    const output = findOpportunityDisplayLayoutOutput.safeParse(result);
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
