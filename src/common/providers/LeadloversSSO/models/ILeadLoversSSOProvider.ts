import { ILeadLoversSSOSession } from '../entities/ILeadLoversSSOSession';
import { ILeadLoversSSOUser } from '../entities/ILeadLoversSSOUser';

export interface ILeadLoversSSOProvider {
  getUser(
    session: ILeadLoversSSOSession
  ): Promise<ILeadLoversSSOUser | undefined>;
  refreshToken(
    refresh_token: string
  ): Promise<ILeadLoversSSOSession | undefined>;
  validateToken(
    session: ILeadLoversSSOSession
  ): Promise<ILeadLoversSSOUser | undefined>;
}
