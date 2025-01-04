import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteInsightFilterService from '@modules/dashboard/application/leadlovers/DeleteInsightFilterService';
import { deleteInsightFilterIntput } from '../dtos/DeleteReportFilterDTO';

export class DeleteInsightFilterHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const deleteInsightFilterService = container.resolve(
        DeleteInsightFilterService
      );

      const input = deleteInsightFilterIntput.safeParse(request.params);
      if (!input.success) {
        return response
          .status(400)
          .json({ status: 'error', result: input.error });
      }
      await deleteInsightFilterService.execute(input.data.id);
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
