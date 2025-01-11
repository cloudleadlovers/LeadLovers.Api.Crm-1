import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindCRMContentService from '@modules/crm/application/leadlovers/FindCRMContentService';
import {
  findCRMContentInput,
  findCRMContentOutput
} from '../dtos/FindCRMContentDTO';

export class FindCRMContentHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findCRMContentService = container.resolve(FindCRMContentService);

    const input = findCRMContentInput.safeParse({
      crmId: request.params.crmId,
      filters: request.query
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const content = await findCRMContentService.execute(
      input.data.crmId,
      input.data.filters
    );
    const output = findCRMContentOutput.safeParse(content);
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
