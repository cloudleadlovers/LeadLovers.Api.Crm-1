import { container } from 'tsyringe';

import ICRMProvider from './DBProviders/models/ICRMProvider';
import IOpportunityProvider from './DBProviders/models/IOpportunityProvider';
import IStageProvider from './DBProviders/models/IStageProvider';

import LeadloversCRMProvider from './DBProviders/implementations/leadlovers/LeadloversCRMProvider';
import LeadloversOpportunityProvider from './DBProviders/implementations/leadlovers/LeadloversOpportunityProvider';
import LeadloversStageProvider from './DBProviders/implementations/leadlovers/LeadloversStageProvider';

container.registerSingleton<ICRMProvider>(
  'LeadloversCRMProvider',
  LeadloversCRMProvider
);

container.registerSingleton<IOpportunityProvider>(
  'LeadloversOpportunityProvider',
  LeadloversOpportunityProvider
);

container.registerSingleton<IStageProvider>(
  'LeadloversStageProvider',
  LeadloversStageProvider
);
