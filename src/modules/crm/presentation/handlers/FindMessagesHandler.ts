import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindMessagesBySequenceIdService from '@modules/crm/application/leadlovers/FindMessagesBySequenceIdService';
import { findMessagesInput, findMessagesOutput } from '../dtos/FindMessagesDTO';

export class FindMessagesHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findMessagesBySequenceIdService = container.resolve(
      FindMessagesBySequenceIdService
    );

    const input = findMessagesInput.safeParse({
      ...request.params,
      pagination: request.query
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const sequences = await findMessagesBySequenceIdService.execute(
      input.data.machineType,
      input.data.sequenceId,
      input.data.pagination
    );
    const output = findMessagesOutput.safeParse(sequences);
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
