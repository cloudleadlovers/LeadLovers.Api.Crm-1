import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@common/config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authorization = request.headers.authorization;
    if (!authorization) {
      return response
        .status(401)
        .json({ status: 'error', message: 'JWT token is missing.' });
    }
    const [, token] = authorization.split(' ');
    const decoded = verify(token, auth.jwt.secret);
    const { sub } = decoded as ITokenPayload;
    request.user = { key: sub };
    return next();
  } catch {
    return response
      .status(401)
      .json({ status: 'error', message: 'Invalid JWT token.' });
  }
}
