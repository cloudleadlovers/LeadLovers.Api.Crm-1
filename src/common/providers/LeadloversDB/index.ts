import { container } from 'tsyringe';

import { FindBoardResponsiblesRepository } from './implementations/boards/FindBoardResponsiblesRepository';
import { FindBoardsByUsuaSistCodiRepository } from './implementations/boards/FindBoardsByUsuaSistCodiRepository';
import { FindBoardTemplatesRepository } from './implementations/boards/FindBoardTemplatesRepository';
import { InsertBoardAccessRepository } from './implementations/boards/InsertBoardAccessRepository';
import { InsertBoardRepository } from './implementations/boards/InsertBoardRepository';
import { FindCardsWonByBoardIdRepository } from './implementations/cards/FindCardsWonByBoardIdRepository';
import { InsertColumnRepository } from './implementations/columns/InsertColumnRepository';
import { AverageDaysAnOpportunitySpendsInAStageRepository } from './implementations/insights/AverageDaysAnOpportunitySpendsInAStageRepository';
import { AverageDaysToCloseAnOpportunityRepository } from './implementations/insights/AverageDaysToCloseAnOpportunityRepository';
import { AverageValueOfOpportunitiesWonRepository } from './implementations/insights/AverageValueOfOpportunitiesWonRepository';
import { CountLostOpportunitiesRepository } from './implementations/insights/CountLostOpportunitiesRepository';
import { FindConversionRateGraphDataRepository } from './implementations/insights/FindConversionRateGraphDataRepository';
import { FindGainConversionRateGraphDataRepository } from './implementations/insights/FindGainConversionRateGraphDataRepository';
import { FindOpportunityStatisticsByResponsibleRepository } from './implementations/insights/FindOpportunityStatisticsByResponsibleRepository';
import { FindReportFiltersByUsuaSistCodiRepository } from './implementations/insights/FindReportFiltersByUsuaSistCodiRepository';
import { InsertReportFilterRepository } from './implementations/insights/InsertReportFilterRepository';
import { RemoveReportFilterRepository } from './implementations/insights/RemoveReportFilterRepository';
import { SumValueOfColumnsRepository } from './implementations/insights/SumValueOfColumnsRepository';
import { SumWonOpportunitiesGroupedByCreationDateRepository } from './implementations/insights/SumWonOpportunitiesGroupedByCreationDateRepository';
import { UpdateReportFilterRepository } from './implementations/insights/UpdateReportFilterRepository';
import { FindUsersByUsuaSistCodiRepository } from './implementations/users/FindUsersByUsuaSistCodiRepository';

import { IFindBoardResponsiblesRepository } from './models/boards/IFindBoardResponsiblesRepository';
import { IFindBoardsByUsuaSistCodiRepository } from './models/boards/IFindBoardsByUsuaSistCodiRepository';
import { IFindBoardTemplatesRepository } from './models/boards/IFindBoardTemplatesRepository';
import { IInsertBoardAccessRepository } from './models/boards/IInsertBoardAccessRepository';
import { IInsertBoardRepository } from './models/boards/IInsertBoardRepository';
import { IFindCardsWonByBoardIdRepository } from './models/cards/FindCardsWonByBoardIdRepository';
import { IInsertColumnRepository } from './models/columns/IInsertColumnRepository';
import { IAverageDaysAnOpportunitySpendsInAStageRepository } from './models/insights/IAverageDaysAnOpportunitySpendsInAStageRepository';
import { IAverageDaysToCloseAnOpportunityRepository } from './models/insights/IAverageDaysToCloseAnOpportunityRepository';
import { IAverageValueOfOpportunitiesWonRepository } from './models/insights/IAverageValueOfOpportunitiesWonRepository';
import { ICountLostOpportunitiesRepository } from './models/insights/ICountLostOpportunitiesRepository';
import { IFindConversionRateGraphDataRepository } from './models/insights/IFindConversionRateGraphDataRepository';
import { IFindGainConversionRateGraphDataRepository } from './models/insights/IFindGainConversionRateGraphDataRepository';
import { IFindOpportunityStatisticsByResponsibleRepository } from './models/insights/IFindOpportunityStatisticsByResponsibleRepository';
import { IFindReportFiltersByUsuaSistCodiRepository } from './models/insights/IFindReportFiltersByUsuaSistCodiRepository';
import { IInsertReportFilterRepository } from './models/insights/IInsertReportFilterRepository';
import { IRemoveReportFilterRepository } from './models/insights/IRemoveReportFilterRepository';
import { ISumValueOfColumnsRepository } from './models/insights/ISumValueOfColumnsRepository';
import { ISumWonOpportunitiesGroupedByCreationDateRepository } from './models/insights/ISumWonOpportunitiesGroupedByCreationDateRepository';
import { IUpdateReportFilterRepository } from './models/insights/IUpdateReportFilterRepository';
import { IFindUsersByUsuaSistCodiRepository } from './models/users/IFindUsersByUsuaSistCodiRepository';

container.registerSingleton<IAverageDaysAnOpportunitySpendsInAStageRepository>(
  'AverageDaysAnOpportunitySpendsInAStageRepository',
  AverageDaysAnOpportunitySpendsInAStageRepository
);

container.registerSingleton<IAverageDaysToCloseAnOpportunityRepository>(
  'AverageDaysToCloseAnOpportunityRepository',
  AverageDaysToCloseAnOpportunityRepository
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

container.registerSingleton<IFindBoardTemplatesRepository>(
  'FindBoardTemplatesRepository',
  FindBoardTemplatesRepository
);

container.registerSingleton<IFindBoardsByUsuaSistCodiRepository>(
  'FindBoardsByUsuaSistCodiRepository',
  FindBoardsByUsuaSistCodiRepository
);

container.registerSingleton<IFindCardsWonByBoardIdRepository>(
  'FindCardsWonByBoardIdRepository',
  FindCardsWonByBoardIdRepository
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

container.registerSingleton<IFindReportFiltersByUsuaSistCodiRepository>(
  'FindReportFiltersByUsuaSistCodiRepository',
  FindReportFiltersByUsuaSistCodiRepository
);

container.registerSingleton<IFindUsersByUsuaSistCodiRepository>(
  'FindUsersByUsuaSistCodiRepository',
  FindUsersByUsuaSistCodiRepository
);

container.registerSingleton<IInsertBoardRepository>(
  'InsertBoardRepository',
  InsertBoardRepository
);

container.registerSingleton<IInsertBoardAccessRepository>(
  'InsertBoardAccessRepository',
  InsertBoardAccessRepository
);

container.registerSingleton<IInsertColumnRepository>(
  'InsertColumnRepository',
  InsertColumnRepository
);

container.registerSingleton<IInsertReportFilterRepository>(
  'InsertReportFilterRepository',
  InsertReportFilterRepository
);

container.registerSingleton<IRemoveReportFilterRepository>(
  'RemoveReportFilterRepository',
  RemoveReportFilterRepository
);

container.registerSingleton<ISumValueOfColumnsRepository>(
  'SumValueOfColumnsRepository',
  SumValueOfColumnsRepository
);

container.registerSingleton<ISumWonOpportunitiesGroupedByCreationDateRepository>(
  'SumWonOpportunitiesGroupedByCreationDateRepository',
  SumWonOpportunitiesGroupedByCreationDateRepository
);

container.registerSingleton<IUpdateReportFilterRepository>(
  'UpdateReportFilterRepository',
  UpdateReportFilterRepository
);
