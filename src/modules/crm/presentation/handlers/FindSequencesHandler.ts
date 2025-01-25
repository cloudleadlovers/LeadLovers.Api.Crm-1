import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindSequencesByMachineIdService from '@modules/crm/application/leadlovers/FindSequencesByMachineIdService';
import {
  findSequencesInput,
  findSequencesOutput
} from '../dtos/FindSequencesDTO';

export class FindSequencesHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findSequencesByMachineIdService = container.resolve(
      FindSequencesByMachineIdService
    );

    const input = findSequencesInput.safeParse({
      ...request.params,
      pagination: request.query
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const sequences = await findSequencesByMachineIdService.execute(
      input.data.machineId,
      input.data.pagination
    );
    const output = findSequencesOutput.safeParse(sequences);
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
