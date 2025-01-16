import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindStageTemplatesService from '@modules/crm/application/leadlovers/FindStageTemplatesService';
import { findStageTemplatesOutput } from '../dtos/FindStageTemplatesDTO';

export class FindStageTemplatesHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findStageTemplatesService = container.resolve(
      FindStageTemplatesService
    );

    const templates = await findStageTemplatesService.execute();
    const output = findStageTemplatesOutput.safeParse(templates);
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
