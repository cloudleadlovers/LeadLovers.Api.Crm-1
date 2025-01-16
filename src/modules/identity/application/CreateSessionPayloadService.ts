import { sign } from 'jsonwebtoken';
import { injectable } from 'tsyringe';

import auth from '@common/config/auth';

type Payload = {
  token: string;
  email: string;
  name: string;
};

type Params = {
  id: string;
  email: string;
  name: string;
};

@injectable()
export default class CreateSessionPayloadService {
  public async execute({ id, name, email }: Params): Promise<Payload> {
    const { secret, expiresIn } = auth.jwt;
    const token = sign({ name, email }, secret, {
      subject: id,
      expiresIn
    });
    return { token, email, name };
  }
}
