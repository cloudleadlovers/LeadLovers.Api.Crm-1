import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetCRMTemplatesService from '@modules/crm/application/leadlovers/GetCRMTemplatesService';
import { FindCRMTemplatesOutput } from '../dtos/FindCRMTemplatesDTO';

export class FindCRMTemplatesHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const getCRMTemplatesService = container.resolve(GetCRMTemplatesService);

    const templates = await getCRMTemplatesService.execute();
    const output = FindCRMTemplatesOutput.safeParse(templates);
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
