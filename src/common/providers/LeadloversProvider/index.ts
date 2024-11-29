import { container } from 'tsyringe';

import { IAverageDaysAnOpportunitySpendsInAStageRepository } from './models/IAverageDaysAnOpportunitySpendsInAStageRepository';
import { IAverageValueOfOpportunitiesWonRepository } from './models/IAverageValueOfOpportunitiesWonRepository';
import { ICountLostOpportunitiesRepository } from './models/ICountLostOpportunitiesRepository';
import { IFindConversionRateGraphDataRepository } from './models/IFindConversionRateGraphDataRepository';
import { IFindGainConversionRateGraphDataRepository } from './models/IFindGainConversionRateGraphDataRepository';
import { IFindOpportunityStatisticsByResponsibleRepository } from './models/IFindOpportunityStatisticsByResponsibleRepository';
import { ISumValueOfColumnsRepository } from './models/ISumValueOfColumnsRepository';
import { ISumWonOpportunitiesGroupedByCreationDateRepository } from './models/ISumWonOpportunitiesGroupedByCreationDateRepository';

import { AverageDaysAnOpportunitySpendsInAStageRepository } from './implementations/AverageDaysAnOpportunitySpendsInAStageRepository';
import { AverageValueOfOpportunitiesWonRepository } from './implementations/AverageValueOfOpportunitiesWonRepository';
import { CountLostOpportunitiesRepository } from './implementations/CountLostOpportunitiesRepository';
import { FindConversionRateGraphDataRepository } from './implementations/FindConversionRateGraphDataRepository';
import { FindGainConversionRateGraphDataRepository } from './implementations/FindGainConversionRateGraphDataRepository';
import { FindOpportunityStatisticsByResponsibleRepository } from './implementations/FindOpportunityStatisticsByResponsibleRepository';
import { SumValueOfColumnsRepository } from './implementations/SumValueOfColumnsRepository';
import { SumWonOpportunitiesGroupedByCreationDateRepository } from './implementations/SumWonOpportunitiesGroupedByCreationDateRepository';

container.registerSingleton<IAverageDaysAnOpportunitySpendsInAStageRepository>(
  'AverageDaysAnOpportunitySpendsInAStageRepository',
  AverageDaysAnOpportunitySpendsInAStageRepository
);

container.registerSingleton<IAverageValueOfOpportunitiesWonRepository>(
  'AverageValueOfOpportunitiesWonRepository',
  AverageValueOfOpportunitiesWonRepository
);

container.registerSingleton<ICountLostOpportunitiesRepository>(
  'CountLostOpportunitiesRepository',
  CountLostOpportunitiesRepository
);

container.registerSingleton<IFindConversionRateGraphDataRepository>(
  'FindConversionRateGraphDataRepository',
  FindConversionRateGraphDataRepository
);

container.registerSingleton<IFindGainConversionRateGraphDataRepository>(
  'FindGainConversionRateGraphDataRepository',
  FindGainConversionRateGraphDataRepository
);

container.registerSingleton<IFindOpportunityStatisticsByResponsibleRepository>(
  'FindOpportunityStatisticsByResponsibleRepository',
  FindOpportunityStatisticsByResponsibleRepository
);

container.registerSingleton<ISumValueOfColumnsRepository>(
  'SumValueOfColumnsRepository',
  SumValueOfColumnsRepository
);

container.registerSingleton<ISumWonOpportunitiesGroupedByCreationDateRepository>(
  'SumWonOpportunitiesGroupedByCreationDateRepository',
  SumWonOpportunitiesGroupedByCreationDateRepository
);
