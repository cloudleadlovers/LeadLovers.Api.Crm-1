import FindInsightFiltersByUserIdService from '@modules/dashboard/application/leadlovers/FindInsightFiltersByUserIdService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { findInsightFiltersByUserIdOutput } from '../dtos/FindInsightFiltersByUserIdDTO';

export class FindInsightFiltersByUserIdHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const findInsightFiltersByUserIdService = container.resolve(
        FindInsightFiltersByUserIdService
      );

      const userId = Number(request.user.key);
      const filters = await findInsightFiltersByUserIdService.execute(userId);
      const output = findInsightFiltersByUserIdOutput.safeParse({ filters });
      if (!output.success) {
        return response
          .status(400)
          .json({ status: 'error', result: output.error });
      }
      return response
        .status(200)
        .json({ status: 'success', result: output.data });
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
