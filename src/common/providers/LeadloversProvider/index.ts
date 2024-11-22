import { container } from 'tsyringe';

import { AverageDaysAnOpportunitySpendsInAStageRepository } from './implementations/AverageDaysAnOpportunitySpendsInAStageRepository';
import { AverageValueOfOpportunitiesWonRepository } from './implementations/AverageValueOfOpportunitiesWonRepository';
import { CountLostOpportunitiesRepository } from './implementations/CountLostOpportunitiesRepository';
import { FindConversionRateGraphDataRepository } from './implementations/FindConversionRateGraphDataRepository';
import { FindGainConversionRateGraphDataRepository } from './implementations/FindGainConversionRateGraphDataRepository';

import { IAverageDaysAnOpportunitySpendsInAStageRepository } from './models/IAverageDaysAnOpportunitySpendsInAStageRepository';
import { IAverageValueOfOpportunitiesWonRepository } from './models/IAverageValueOfOpportunitiesWonRepository';
import { ICountLostOpportunitiesRepository } from './models/ICountLostOpportunitiesRepository';
import { IFindConversionRateGraphDataRepository } from './models/IFindConversionRateGraphDataRepository';
import { IFindGainConversionRateGraphDataRepository } from './models/IFindGainConversionRateGraphDataRepository';

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
