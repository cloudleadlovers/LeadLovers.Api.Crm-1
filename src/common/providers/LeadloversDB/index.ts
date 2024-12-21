import { container } from 'tsyringe';

import { IFindBoardResponsiblesRepository } from './models/boards/IFindBoardResponsiblesRepository';
import { IFindBoardsByUsuaSistCodiRepository } from './models/boards/IFindBoardsByUsuaSistCodiRepository';
import { IAverageDaysAnOpportunitySpendsInAStageRepository } from './models/insights/IAverageDaysAnOpportunitySpendsInAStageRepository';
import { IAverageValueOfOpportunitiesWonRepository } from './models/insights/IAverageValueOfOpportunitiesWonRepository';
import { ICountLostOpportunitiesRepository } from './models/insights/ICountLostOpportunitiesRepository';
import { IFindConversionRateGraphDataRepository } from './models/insights/IFindConversionRateGraphDataRepository';
import { IFindGainConversionRateGraphDataRepository } from './models/insights/IFindGainConversionRateGraphDataRepository';
import { IFindOpportunityStatisticsByResponsibleRepository } from './models/insights/IFindOpportunityStatisticsByResponsibleRepository';
import { ISumValueOfColumnsRepository } from './models/insights/ISumValueOfColumnsRepository';
import { ISumWonOpportunitiesGroupedByCreationDateRepository } from './models/insights/ISumWonOpportunitiesGroupedByCreationDateRepository';

import { FindBoardResponsiblesRepository } from './implementations/boards/FindBoardResponsiblesRepository';
import { FindBoardsByUsuaSistCodiRepository } from './implementations/boards/FindBoardsByUsuaSistCodiRepository';
import { AverageDaysAnOpportunitySpendsInAStageRepository } from './implementations/insights/AverageDaysAnOpportunitySpendsInAStageRepository';
import { AverageValueOfOpportunitiesWonRepository } from './implementations/insights/AverageValueOfOpportunitiesWonRepository';
import { CountLostOpportunitiesRepository } from './implementations/insights/CountLostOpportunitiesRepository';
import { FindConversionRateGraphDataRepository } from './implementations/insights/FindConversionRateGraphDataRepository';
import { FindGainConversionRateGraphDataRepository } from './implementations/insights/FindGainConversionRateGraphDataRepository';
import { FindOpportunityStatisticsByResponsibleRepository } from './implementations/insights/FindOpportunityStatisticsByResponsibleRepository';
import { SumValueOfColumnsRepository } from './implementations/insights/SumValueOfColumnsRepository';
import { SumWonOpportunitiesGroupedByCreationDateRepository } from './implementations/insights/SumWonOpportunitiesGroupedByCreationDateRepository';

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

container.registerSingleton<IFindBoardResponsiblesRepository>(
  'FindBoardResponsiblesRepository',
  FindBoardResponsiblesRepository
);

container.registerSingleton<IFindBoardsByUsuaSistCodiRepository>(
  'FindBoardsByUsuaSistCodiRepository',
  FindBoardsByUsuaSistCodiRepository
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
