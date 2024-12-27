import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindCRMTemplatesService from '@modules/crm/application/leadlovers/FindCRMTemplatesService';
import { findCRMTemplatesOutput } from '../dtos/FindCRMTemplatesDTO';

export class FindCRMTemplatesHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findCRMTemplatesService = container.resolve(FindCRMTemplatesService);

    const templates = await findCRMTemplatesService.execute();
    const output = findCRMTemplatesOutput.safeParse(templates);
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
