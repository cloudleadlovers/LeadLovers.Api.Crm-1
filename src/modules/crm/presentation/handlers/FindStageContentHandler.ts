import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindStageContentService from '@modules/crm/application/leadlovers/FindStageContentService';
import {
  findStageContentInput,
  findStageContentOutput
} from '../dtos/FindStageContentDTO';

export class FindStageContentHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findStageContentService = container.resolve(FindStageContentService);

    const input = findStageContentInput.safeParse({
      stageId: request.params.stageId,
      pagination: request.query,
      filters: request.query
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const content = await findStageContentService.execute(
      input.data.stageId,
      input.data.pagination,
      input.data.filters
    );
    const output = findStageContentOutput.safeParse(content);
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
