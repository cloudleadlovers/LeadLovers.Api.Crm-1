import { container } from 'tsyringe';

import IConversionRateProvider from './DbProviders/models/IConversionRateProvider';
import IRevenueReportProvider from './DbProviders/models/IRevenueReportProvider';
import ITeamReportProvider from './DbProviders/models/ITeamReportProvider';

import LeadloversConversionRateProvider from './DbProviders/implementations/leadlovers/LeadloversConversionRateProvider';
import LeadloversRevenueReportProvider from './DbProviders/implementations/leadlovers/LeadloversRevenueReportProvider';
import LeadloversTeamReportProvider from './DbProviders/implementations/leadlovers/LeadloversTeamReportProvider';

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
