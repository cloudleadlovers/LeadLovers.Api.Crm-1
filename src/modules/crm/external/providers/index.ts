import { container } from 'tsyringe';

import LeadloversCRMProvider from './DBProviders/implementations/leadlovers/LeadloversCRMProvider';

import ICRMProvider from './DBProviders/models/ICRMProvider';

container.registerSingleton<ICRMProvider>(
  'LeadloversCRMProvider',
  LeadloversCRMProvider
);
