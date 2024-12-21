import { container } from 'tsyringe';

import ISSOProvider from './SSOProviders/models/ISSOProvider';

import LeadloversSSOProvider from './SSOProviders/implementations/leadlovers/LeadloversSSOProvider';

container.registerSingleton<ISSOProvider>(
  'LeadloversSessionProvider',
  LeadloversSSOProvider
);
