import { Request, Response } from 'express';
import { container } from 'tsyringe';

import EditInsightFilterService from '@modules/dashboard/application/leadlovers/EditInsightFilterService';
import { editReportFilterIntput as editInsightFilterIntput } from '../dtos/EditInsightFilterDTO';

export class EditInsightFilterHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const editInsightFilterService = container.resolve(
        EditInsightFilterService
      );

      const input = editInsightFilterIntput.safeParse({
        ...request.params,
        ...request.body
      });
      if (!input.success) {
        return response
          .status(400)
          .json({ status: 'error', result: input.error });
      }
      await editInsightFilterService.execute(input.data);
      return response.status(204).json({ status: 'success', result: {} });
    } catch (error: unknown) {
      return response.status(500).json({
        status: 'error',
        result: {
          message: (error as Error).message
        }
      });
    }
  }
}
