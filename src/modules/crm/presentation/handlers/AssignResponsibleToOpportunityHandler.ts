import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AssignResponsibleToOpportunitiesService from '@modules/crm/application/leadlovers/AssignResponsibleToOpportunityService';
import { assignResponsibleToOpportunitiesInput } from '../dtos/AssignResponsibleToOpportunitiesDTO';

export class AssignResponsibleToOpportunitiesHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const assignResponsibleToOpportunitiesService = container.resolve(
      AssignResponsibleToOpportunitiesService
    );

    const input = assignResponsibleToOpportunitiesInput.safeParse({
      userId: Number(request.user.key),
      ...request.body,
      ...request.params
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    await assignResponsibleToOpportunitiesService.execute(input.data);
    return response.status(204).json({ status: 'success', result: {} });
  }
}
