import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetConversionRateInsightsService from '../application/leadlovers/GetConversionRateInsightsService';
import {
  createConversionRateDashboardIntput,
  createConversionRateDashboardOutput
} from './dtos/CreateConversionRateDashboardDTO';

export class CreateConversionRateDashboard {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const getConversionRateInsightsService = container.resolve(
        GetConversionRateInsightsService
      );

      const input = createConversionRateDashboardIntput.safeParse(request.body);
      if (!input.success) {
        return response
          .status(400)
          .json({ status: 'error', result: input.error });
      }
      const data = await getConversionRateInsightsService.execute(input.data);
      const output = createConversionRateDashboardOutput.safeParse(data);
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
