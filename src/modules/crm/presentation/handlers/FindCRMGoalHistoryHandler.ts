import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindCRMGoalHistoryService from '../../application/leadlovers/FindCRMGoalHistoryService';
import {
  findCRMGoalHistoryOutput,
  findCRMGoalHistoryInput
} from '../dtos/FindCRMGoalHistoryDTO';

export class FindCRMGoalHistoryHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findCRMGoalHistoryService = container.resolve(
      FindCRMGoalHistoryService
    );
    const input = findCRMGoalHistoryInput.safeParse({
      crmId: Number(request.params.crmId)
    });
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const history = await findCRMGoalHistoryService.execute(input.data.crmId);
    const output = findCRMGoalHistoryOutput.safeParse(history);
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
