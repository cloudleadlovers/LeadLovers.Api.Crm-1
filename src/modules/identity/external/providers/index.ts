import { container } from 'tsyringe';

import ISessionProvider from './SessionProviders/models/ISessionProvider';

import LeadloversSessionProvider from './SessionProviders/implementations/leadlovers/LeadloversSessionProvider';

container.registerSingleton<ISessionProvider>(
  'LeadloversSessionProvider',
  LeadloversSessionProvider
);
