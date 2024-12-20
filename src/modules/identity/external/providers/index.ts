import { container } from 'tsyringe';

import ISessionProvider from './SessionProviders/models/ISessionProvider';

import SessionProvider from './SessionProviders/implementations/leadlovers/SessionProvider';

container.registerSingleton<ISessionProvider>(
  'LeadloversSessionProvider',
  SessionProvider
);
