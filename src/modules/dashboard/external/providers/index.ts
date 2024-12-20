import { container } from 'tsyringe';

import IConversionRateProvider from './DBProviders/models/IConversionRateProvider';
import IRevenueReportProvider from './DBProviders/models/IRevenueReportProvider';
import ITeamReportProvider from './DBProviders/models/ITeamReportProvider';

import LeadloversConversionRateProvider from './DBProviders/implementations/leadlovers/LeadloversConversionRateProvider';
import LeadloversRevenueReportProvider from './DBProviders/implementations/leadlovers/LeadloversRevenueReportProvider';
import LeadloversTeamReportProvider from './DBProviders/implementations/leadlovers/LeadloversTeamReportProvider';

container.registerSingleton<IConversionRateProvider>(
  'LeadloversConversionRateProvider',
  LeadloversConversionRateProvider
);

container.registerSingleton<IRevenueReportProvider>(
  'LeadloversRevenueReportProvider',
  LeadloversRevenueReportProvider
);

container.registerSingleton<ITeamReportProvider>(
  'LeadloversTeamReportProvider',
  LeadloversTeamReportProvider
);
