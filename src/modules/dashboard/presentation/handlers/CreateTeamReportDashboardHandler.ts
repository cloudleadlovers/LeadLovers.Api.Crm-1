import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetTeamReportInsightsService from '@modules/dashboard/application/leadlovers/GetTeamReportInsightsService';
import {
  createTeamReportDashboardIntput,
  createTeamReportDashboardOutput
} from '../dtos/CreateTeamReportDashboardDTO';

export class CreateTeamReportDashboardHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const getTeamReportInsightsService = container.resolve(
        GetTeamReportInsightsService
      );

      const input = createTeamReportDashboardIntput.safeParse(request.body);
      if (!input.success) {
        return response
          .status(400)
          .json({ status: 'error', result: input.error });
      }
      const data = await getTeamReportInsightsService.execute(input.data);
      const output = createTeamReportDashboardOutput.safeParse(data);
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
