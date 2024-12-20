import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from '@common/errors/AppError';
import { logger } from 'infa/logger/pinoLogger';

export const handleErrors = (
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction
) => {
  logger.error({ msg: error.message, stack: error.stack });
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }
  if (error instanceof ZodError) {
    return response.status(400).json({
      status: 'error',
      message: error.message
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
