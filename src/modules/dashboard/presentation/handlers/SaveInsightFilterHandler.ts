import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SaveInsightFilterService from '@modules/dashboard/application/leadlovers/SaveInsightFilterService';
import {
  saveReportFilterIntput as saveInsightFilterIntput,
  saveReportFilterOutput as saveInsightFilterOutput
} from '../dtos/SaveReportFilterDTO';

export class SaveInsightFilterHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const saveInsightFilterService = container.resolve(
        SaveInsightFilterService
      );

      const userId = Number(request.user.key);
      const input = saveInsightFilterIntput.safeParse({
        userId,
        ...request.body
      });
      if (!input.success) {
        return response
          .status(400)
          .json({ status: 'error', result: input.error });
      }
      const id = await saveInsightFilterService.execute(input.data);
      const output = saveInsightFilterOutput.safeParse({ id });
      if (!output.success) {
        return response
          .status(400)
          .json({ status: 'error', result: output.error });
      }
      return response
        .status(201)
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
