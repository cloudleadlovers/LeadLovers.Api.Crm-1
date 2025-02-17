import { Request, Response } from 'express';
import { container } from 'tsyringe';

import MoveOpportunitiesService from '@modules/crm/application/leadlovers/MoveOpportunitiesService';
import { moveOpportunitiesInput } from '../dtos/MoveOpportunitiesDTO';

export class MoveOpportunitiesHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const moveOpportunitiesService = container.resolve(
      MoveOpportunitiesService
    );

    const input = moveOpportunitiesInput.safeParse({
      userId: Number(request.user.key),
      ...request.body,
      ...request.params
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    await moveOpportunitiesService.execute(input.data);
    return response.status(204).json({ status: 'success', result: {} });
  }
}
