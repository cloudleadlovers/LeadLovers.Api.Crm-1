import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindMachinesByUserIdService from '@modules/crm/application/leadlovers/FindMachinesByUserIdService';
import { findMachinesInput, findMachinesOutput } from '../dtos/FindMachinesDTO';

export class FindMachinesHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findMachinesByUserIdService = container.resolve(
      FindMachinesByUserIdService
    );

    const input = findMachinesInput.safeParse({
      userId: Number(request.user.key),
      pagination: request.query
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const machines = await findMachinesByUserIdService.execute(
      input.data.userId,
      input.data.pagination
    );
    const output = findMachinesOutput.safeParse(machines);
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
