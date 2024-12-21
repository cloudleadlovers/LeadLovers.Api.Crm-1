import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionPayloadService from '../../application/CreateSessionPayloadService';
import ValidateSSOTokenService from '../../application/leadlovers/ValidateSSOTokenService';
import {
  createSessionIntput,
  createSessionOutput
} from '../dtos/CreateSessionDTO';

export class CreateSessionHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const validateSSOTokenService = container.resolve(ValidateSSOTokenService);
    const createSessionPayloadService = container.resolve(
      CreateSessionPayloadService
    );

    const input = createSessionIntput.safeParse(request.body);
    if (!input.success) {
      return response
        .status(400)
        .json({ status: 'error', result: input.error });
    }
    const ssoPayload = await validateSSOTokenService.execute(input.data);
    const sessionPayload =
      await createSessionPayloadService.execute(ssoPayload);
    const output = createSessionOutput.safeParse(sessionPayload);
    if (!output.success) {
      return response
        .status(400)
        .json({ status: 'error', result: output.error });
    }
    return response
      .status(201)
      .json({ status: 'success', result: output.data });
  }
}
