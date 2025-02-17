import { container } from 'tsyringe';

import ICRMProvider from './DBProviders/models/ICRMProvider';
import IOpportunityProvider from './DBProviders/models/IOpportunityProvider';
import IStageProvider from './DBProviders/models/IStageProvider';

import LeadloversCRMProvider from './DBProviders/implementations/leadlovers/LeadloversCRMProvider';
import LeadloversOpportunityProvider from './DBProviders/implementations/leadlovers/LeadloversOpportunityProvider';
import LeadloversStageProvider from './DBProviders/implementations/leadlovers/LeadloversStageProvider';
import ICRMGoalQueueProvider from './DBProviders/models/ICRMGoalQueueProvider';
import LeadloversCRMGoalQueueProvider from './DBProviders/implementations/leadlovers/LeadloversCRMGoalQueueProvider';
import LeadloversGoalHistoryProvider from './DBProviders/implementations/leadlovers/LeadloversGoalHistoryProvider';
import IGoalHistoryProvider from './DBProviders/models/IGoalHistoryProvider';

container.registerSingleton<ICRMProvider>(
  'LeadloversCRMProvider',
  LeadloversCRMProvider
);

container.registerSingleton<ICRMGoalQueueProvider>(
  'LeadloversCRMGoalQueueProvider',
  LeadloversCRMGoalQueueProvider
);

container.registerSingleton<IGoalHistoryProvider>(
  'LeadloversGoalHistoryProvider',
  LeadloversGoalHistoryProvider
);

container.registerSingleton<IOpportunityProvider>(
  'LeadloversOpportunityProvider',
  LeadloversOpportunityProvider
);

container.registerSingleton<IStageProvider>(
  'LeadloversStageProvider',
  LeadloversStageProvider
);
