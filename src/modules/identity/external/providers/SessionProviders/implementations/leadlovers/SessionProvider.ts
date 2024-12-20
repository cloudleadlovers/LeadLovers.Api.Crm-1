import { inject, injectable } from 'tsyringe';

import { ILeadLoversSSOProvider } from '@common/providers/LeadloversSSO/models/ILeadLoversSSOProvider';
import ISessionProvider, {
  Session,
  ValidateTokenParams
} from '../../models/ISessionProvider';

@injectable()
export default class SessionProvider implements ISessionProvider {
  constructor(
    @inject('LeadLoversSSOProvider')
    private ssoProvider: ILeadLoversSSOProvider
  ) {}

  public async validateToken(params: ValidateTokenParams): Promise<Session> {
    const user = await this.ssoProvider.validateToken({
      token: params.token,
      refresh_token: params.refreshToken
    });
    if (!user) throw new Error('Authentication failed');
    return { id: user.id.toString(), email: user.email, name: user.name };
  }
}
