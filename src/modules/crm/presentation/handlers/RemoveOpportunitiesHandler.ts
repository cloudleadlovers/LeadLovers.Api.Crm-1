import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RemoveOpportunitiesService from '@modules/crm/application/leadlovers/RemoveOpportunitiesService';
import { removeOpportunitiesInput } from '../dtos/RemoveOpportunitiesDTO';

export class RemoveOpportunitiesHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const removeOpportunitiesService = container.resolve(
      RemoveOpportunitiesService
    );

    const input = removeOpportunitiesInput.safeParse({
      userId: Number(request.user.key),
      ...request.body,
      ...request.params
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    await removeOpportunitiesService.execute(input.data);
    return response.status(204).json({ status: 'success', result: {} });
  }
}
