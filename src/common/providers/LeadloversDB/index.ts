import { container } from 'tsyringe';

import { IFindBoardAccessByBoardIdRepository } from './models/boards/IFindBoardAccessByBoardIdRepository';
import { IFindBoardRepository } from './models/boards/IFindBoardRepository';
import { IFindBoardResponsiblesRepository } from './models/boards/IFindBoardResponsiblesRepository';
import { IFindBoardsByUsuaSistCodiRepository } from './models/boards/IFindBoardsByUsuaSistCodiRepository';
import { IFindColumnTemplatesRepository } from './models/boards/IFindColumnTemplatesRepository';
import { IInsertBoardAccessRepository } from './models/boards/IInsertBoardAccessRepository';
import { IInsertBoardRepository } from './models/boards/IInsertBoardRepository';
import { IFindCardsByColumnIdRepository } from './models/cards/IFindCardsByColumnIdRepository';
import { IFindCardsWonByBoardIdRepository } from './models/cards/IFindCardsWonByBoardIdRepository';
import { IUpdateCardRepository } from './models/cards/IUpdateCardRepository';
import { IUpdateCardsByColumnIdRepository } from './models/cards/IUpdateCardsByColumnIdRepository';
import { IFindColumnByTitleRepository } from './models/columns/IFindColumnByTitleRepository';
import { IFindColumnRepository } from './models/columns/IFindColumnRepository';
import { IFindColumnsByBoardIdRepository } from './models/columns/IFindColumnsByBoardIdRepository';
import { IInsertColumnRepository } from './models/columns/IInsertColumnRepository';
import { IUpdateColumnRepository } from './models/columns/IUpdateColumnRepository';
import { IInsertPipelineHistoryRepository } from './models/history/IInsertPipelineHistoryRepository';
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
import { IFindLeadsByUsuaSistCodiRepository } from './models/leads/IFindLeadsByUsuaSistCodiRepository';
import { IRemoveCardNotificationRepository } from './models/notifications/IRemoveCardNotificationRepository';
import { IRemoveCardNotificationsRepository } from './models/notifications/IRemoveCardNotificationsRepository';
import { IRemoveColumnNotificationRepository } from './models/notifications/IRemoveColumnNotificationRepository';
import { IFindUsersByUsuaSistCodiRepository } from './models/users/IFindUsersByUsuaSistCodiRepository';

import { FindBoardAccessByBoardIdRepository } from './implementations/boards/FindBoardAccessByBoardIdRepository';
import { FindBoardRepository } from './implementations/boards/FindBoardRepository';
import { FindBoardResponsiblesRepository } from './implementations/boards/FindBoardResponsiblesRepository';
import { FindBoardsByUsuaSistCodiRepository } from './implementations/boards/FindBoardsByUsuaSistCodiRepository';
import { FindColumnTemplatesRepository } from './implementations/boards/FindColumnTemplatesRepository';
import { InsertBoardAccessRepository } from './implementations/boards/InsertBoardAccessRepository';
import { InsertBoardRepository } from './implementations/boards/InsertBoardRepository';
import { FindCardsByColumnIdRepository } from './implementations/cards/FindCardsByColumnIdRepository';
import { FindCardsWonByBoardIdRepository } from './implementations/cards/FindCardsWonByBoardIdRepository';
import { UpdateCardRepository } from './implementations/cards/UpdateCardRepository';
import { UpdateCardsByColumnIdRepository } from './implementations/cards/UpdateCardsByColumnIdRepository';
import { FindColumnByTitleRepository } from './implementations/columns/FindColumnByTitleRepository';
import { FindColumnRepository } from './implementations/columns/FindColumnRepository';
import { FindColumnsByBoardIdRepository } from './implementations/columns/FindColumnsByBoardIdRepository';
import { InsertColumnRepository } from './implementations/columns/InsertColumnRepository';
import { UpdateColumnRepository } from './implementations/columns/UpdateColumnRepository';
import { InsertPipelineHistoryRepository } from './implementations/history/InsertPipelineHistoryRepository';
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
import { FindLeadsByUsuaSistCodiRepository } from './implementations/leads/FindLeadsByUsuaSistCodiRepository';
import { RemoveCardNotificationRepository } from './implementations/notifications/RemoveCardNotificationRepository';
import { RemoveCardNotificationsRepository } from './implementations/notifications/RemoveCardNotificationsRepository';
import { RemoveColumnNotificationRepository } from './implementations/notifications/RemoveColumnNotificationRepository';
import { FindUsersByUsuaSistCodiRepository } from './implementations/users/FindUsersByUsuaSistCodiRepository';

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

container.registerSingleton<IFindBoardRepository>(
  'FindBoardRepository',
  FindBoardRepository
);

container.registerSingleton<IFindBoardAccessByBoardIdRepository>(
  'FindBoardAccessByBoardIdRepository',
  FindBoardAccessByBoardIdRepository
);

container.registerSingleton<IFindBoardResponsiblesRepository>(
  'FindBoardResponsiblesRepository',
  FindBoardResponsiblesRepository
);

container.registerSingleton<IFindBoardsByUsuaSistCodiRepository>(
  'FindBoardsByUsuaSistCodiRepository',
  FindBoardsByUsuaSistCodiRepository
);

container.registerSingleton<IFindCardsByColumnIdRepository>(
  'FindCardsByColumnIdRepository',
  FindCardsByColumnIdRepository
);

container.registerSingleton<IFindCardsWonByBoardIdRepository>(
  'FindCardsWonByBoardIdRepository',
  FindCardsWonByBoardIdRepository
);

container.registerSingleton<IFindColumnRepository>(
  'FindColumnRepository',
  FindColumnRepository
);

container.registerSingleton<IFindColumnByTitleRepository>(
  'FindColumnByTitleRepository',
  FindColumnByTitleRepository
);

container.registerSingleton<IFindColumnsByBoardIdRepository>(
  'FindColumnsByBoardIdRepository',
  FindColumnsByBoardIdRepository
);

container.registerSingleton<IFindColumnTemplatesRepository>(
  'FindColumnTemplatesRepository',
  FindColumnTemplatesRepository
);

container.registerSingleton<IFindConversionRateGraphDataRepository>(
  'FindConversionRateGraphDataRepository',
  FindConversionRateGraphDataRepository
);

container.registerSingleton<IFindGainConversionRateGraphDataRepository>(
  'FindGainConversionRateGraphDataRepository',
  FindGainConversionRateGraphDataRepository
);

container.registerSingleton<IFindLeadsByUsuaSistCodiRepository>(
  'FindLeadsByUsuaSistCodiRepository',
  FindLeadsByUsuaSistCodiRepository
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

container.registerSingleton<IInsertPipelineHistoryRepository>(
  'InsertPipelineHistoryRepository',
  InsertPipelineHistoryRepository
);

container.registerSingleton<IInsertReportFilterRepository>(
  'InsertReportFilterRepository',
  InsertReportFilterRepository
);

container.registerSingleton<IRemoveCardNotificationRepository>(
  'RemoveCardNotificationRepository',
  RemoveCardNotificationRepository
);

container.registerSingleton<IRemoveCardNotificationsRepository>(
  'RemoveCardNotificationsRepository',
  RemoveCardNotificationsRepository
);

container.registerSingleton<IRemoveColumnNotificationRepository>(
  'RemoveColumnNotificationRepository',
  RemoveColumnNotificationRepository
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

container.registerSingleton<IUpdateCardRepository>(
  'UpdateCardRepository',
  UpdateCardRepository
);

container.registerSingleton<IUpdateCardsByColumnIdRepository>(
  'UpdateCardsByColumnIdRepository',
  UpdateCardsByColumnIdRepository
);

container.registerSingleton<IUpdateColumnRepository>(
  'UpdateColumnRepository',
  UpdateColumnRepository
);

container.registerSingleton<IUpdateReportFilterRepository>(
  'UpdateReportFilterRepository',
  UpdateReportFilterRepository
);
