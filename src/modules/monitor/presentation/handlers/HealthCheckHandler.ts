import { Request, Response } from 'express';

import server from '@common/config/server';

export class HealthCheckHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      return response.status(200).json({
        status: 'success',
        result: { status: 'available', environment: server.environment }
      });
    } catch (error: unknown) {
      return response.status(500).json({
        status: 'error',
        result: {
          status: 'unavailable',
          environment: server.environment,
          message: (error as Error).message
        }
      });
    }
  }
}
