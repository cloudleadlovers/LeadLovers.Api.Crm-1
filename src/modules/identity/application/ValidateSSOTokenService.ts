import { inject, injectable } from 'tsyringe';

import { AppError } from '@common/errors/AppError';
import ISessionProvider from '../external/providers/SessionProviders/models/ISessionProvider';

type SSOPayload = {
  id: string;
  email: string;
  name: string;
};

type Params = {
  token: string;
  refreshToken: string;
};

@injectable()
export default class ValidateSSOTokenService {
  constructor(
    @inject('LeadloversSessionProvider')
    private sessionProvider: ISessionProvider
  ) {}

  public async execute({ token, refreshToken }: Params): Promise<SSOPayload> {
    try {
      const user = await this.sessionProvider.validateToken({
        token,
        refreshToken
      });
      return { id: user.id, email: user.email, name: user.name };
    } catch (error: unknown) {
      throw new AppError((error as Error).message, 401);
    }
  }
}
