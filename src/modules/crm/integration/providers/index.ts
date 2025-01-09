import { container } from 'tsyringe';

import LeadloversOpportunityApiProvider from './APIProviders/implementations/leadlovers/LeadloversOpportunityApiProvider';

import IOpportunityApiProvider from './APIProviders/models/IOpportunityApiProvider';

container.registerSingleton<IOpportunityApiProvider>(
  'LeadloversOpportunityApiProvider',
  LeadloversOpportunityApiProvider
);
