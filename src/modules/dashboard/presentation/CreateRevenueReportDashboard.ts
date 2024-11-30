import { Request, Response } from 'express';

import { container } from 'tsyringe';
import GetRevenueReportInsightsService from '../application/leadlovers/GetRevenueReportInsightsService';
import {
  createRevenueReportDashboardIntput,
  createRevenueReportDashboardOutput
} from './dtos/CreateRevenueReportDashboardDTO';

export class CreateRevenueReportDashboard {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const getRevenueReportInsightsService = container.resolve(
        GetRevenueReportInsightsService
      );

      const input = createRevenueReportDashboardIntput.safeParse(request.body);
      if (!input.success) {
        return response
          .status(400)
          .json({ status: 'error', result: input.error });
      }
      const data = await getRevenueReportInsightsService.execute(input.data);
      const output = createRevenueReportDashboardOutput.safeParse(data);
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
