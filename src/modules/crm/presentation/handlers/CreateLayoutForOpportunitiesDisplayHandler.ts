import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLayoutForOpportunitiesDisplayService from '@modules/crm/application/leadlovers/CreateLayoutForOpportunitiesDisplayService';
import { createLayoutForOpportunitiesDisplayInput } from '../dtos/CreateLayoutForOpportunitiesDisplayDTO';

export class CreateLayoutForOpportunitiesDisplayHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createLayoutForOpportunitiesDisplayService = container.resolve(
      CreateLayoutForOpportunitiesDisplayService
    );

    const input = createLayoutForOpportunitiesDisplayInput.safeParse({
      ...request.params,
      ...request.body
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    await createLayoutForOpportunitiesDisplayService.execute(input.data);
    return response.status(201).json({ status: 'success', result: {} });
  }
}
