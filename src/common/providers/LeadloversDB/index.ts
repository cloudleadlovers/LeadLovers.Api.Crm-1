import { container } from 'tsyringe';

import { IInsertBoardAccessRepository } from './models/boardAccess/IInsertBoardAccessRepository';
import { IFindBoardAccessByBoardIdRepository } from './models/boards/IFindBoardAccessByBoardIdRepository';
import { IFindBoardRepository } from './models/boards/IFindBoardRepository';
import { IFindBoardResponsiblesRepository } from './models/boards/IFindBoardResponsiblesRepository';
import { IFindBoardsByUsuaSistCodiRepository } from './models/boards/IFindBoardsByUsuaSistCodiRepository';
import { IFindColumnTemplatesRepository } from './models/boards/IFindColumnTemplatesRepository';
import { IInsertBoardRepository } from './models/boards/IInsertBoardRepository';
import { IUpdateBoardRepository } from './models/boards/IUpdateBoardRepository';
import { IFindCardLayoutByBoardIdRepository } from './models/cardLayouts/IFindCardLayoutByBoardIdRepository';
import { IInsertCardLayoutRepository } from './models/cardLayouts/IInsertCardLayoutRepository';
import { IFindCardByBoardIdAndLeadCodiRepository } from './models/cards/IFindCardByBoardIdAndLeadCodiRepository';
import { IFindCardByColumnIdAndLeadCodiRepository } from './models/cards/IFindCardByColumnIdAndLeadCodiRepository';
import { IFindCardsByColumnIdRepository } from './models/cards/IFindCardsByColumnIdRepository';
import { IFindCardsWonByBoardIdRepository } from './models/cards/IFindCardsWonByBoardIdRepository';
import { IInsertCardRepository } from './models/cards/IInsertCardRepository';
import { IUpdateCardRepository } from './models/cards/IUpdateCardRepository';
import { IUpdateCardsByColumnIdRepository } from './models/cards/IUpdateCardsByColumnIdRepository';
import { IFindColumnByTitleRepository } from './models/columns/IFindColumnByTitleRepository';
import { IFindColumnRepository } from './models/columns/IFindColumnRepository';
import { IFindColumnsByBoardIdRepository } from './models/columns/IFindColumnsByBoardIdRepository';
import { IInsertColumnRepository } from './models/columns/IInsertColumnRepository';
import { IUpdateColumnRepository } from './models/columns/IUpdateColumnRepository';
import { IFindFunnelsByListCodiRepository } from './models/funnels/IFindFunnelsByListCodiRepository';
import { IInsertPipelineDealHistoryRepository } from './models/history/IInsertPipelineDealHistoryRepository';
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
import { IRemoveLeadFromBlackListRepository } from './models/leadBlackList/IRemoveLeadFromBlackListRepository';
import { IUpsertLeadCaptureDataRepository } from './models/leadCaptureData/IUpsertLeadCaptureDataRepository';
import { IFindLeadCaptureFieldsByUserIdRepository } from './models/leadCaptureField/IFindLeadCaptureFieldsByUserIdRepository';
import { IFindLeadFromMachineByPhoneRepository } from './models/leads/IFindLeadFromMachineByPhoneRepository';
import { IFindLeadsByUsuaSistCodiRepository } from './models/leads/IFindLeadsByUsuaSistCodiRepository';
import { IInsertLeadOnWhatsAppMachineRepository } from './models/leads/IInsertLeadOnWhatsAppMachineRepository';
import { IInsertLeadRepository } from './models/leads/IInsertLeadRepository';
import { IInsertLeadTrackRepository } from './models/leadTrack/IInsertLeadTrackRepository';
import { IRemoveTagsTrackRepository } from './models/leadTrack/IRemoveTagsTrackRepository';
import { IFindLeadUsuaSistByLeadCodiRepository } from './models/leadUsuaSists/IFindLeadUsuaSistByLeadCodiRepository';
import { IFindLeadUsuaSistRepository } from './models/leadUsuaSists/IFindLeadUsuaSistRepository';
import { IInsertLeadUsuaSistTagRepository } from './models/leadUsuaSistTags/IInsertLeadUsuaSistTagRepository';
import { IRemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository } from './models/leadUsuaSistTags/IRemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository';
import { IFindListsByUsuaSistCodiRepository } from './models/lists/IFindListsByUsuaSistCodiRepository';
import { IFindDefaultModelsByFuniCodiRepository } from './models/models/IFindDefaultModelsByFuniCodiRepository';
import { IRemoveCardNotificationRepository } from './models/notifications/IRemoveCardNotificationRepository';
import { IRemoveCardNotificationsRepository } from './models/notifications/IRemoveCardNotificationsRepository';
import { IRemoveColumnNotificationRepository } from './models/notifications/IRemoveColumnNotificationRepository';
import { IFindUsersByUsuaSistCodiRepository } from './models/users/IFindUsersByUsuaSistCodiRepository';

import { InsertBoardAccessRepository } from './implementations/boardAccess/InsertBoardAccessRepository';
import { FindBoardAccessByBoardIdRepository } from './implementations/boards/FindBoardAccessByBoardIdRepository';
import { FindBoardRepository } from './implementations/boards/FindBoardRepository';
import { FindBoardResponsiblesRepository } from './implementations/boards/FindBoardResponsiblesRepository';
import { FindBoardsByUsuaSistCodiRepository } from './implementations/boards/FindBoardsByUsuaSistCodiRepository';
import { FindColumnTemplatesRepository } from './implementations/boards/FindColumnTemplatesRepository';
import { InsertBoardRepository } from './implementations/boards/InsertBoardRepository';
import { UpdateBoardRepository } from './implementations/boards/UpdateBoardRepository';
import { FindCardLayoutByBoardIdRepository } from './implementations/cardLayouts/FindCardLayoutByBoardIdRepository';
import { InsertCardLayoutRepository } from './implementations/cardLayouts/InsertCardLayoutRepository';
import { FindCardByBoardIdAndLeadCodiRepository } from './implementations/cards/FindCardByBoardIdAndLeadCodiRepository';
import { FindCardByColumnIdAndLeadCodiRepository } from './implementations/cards/FindCardByColumnIdAndLeadCodiRepository';
import { FindCardsByColumnIdRepository } from './implementations/cards/FindCardsByColumnIdRepository';
import { FindCardsWonByBoardIdRepository } from './implementations/cards/FindCardsWonByBoardIdRepository';
import { InsertCardRepository } from './implementations/cards/InsertCardRepository';
import { UpdateCardRepository } from './implementations/cards/UpdateCardRepository';
import { UpdateCardsByColumnIdRepository } from './implementations/cards/UpdateCardsByColumnIdRepository';
import { FindColumnByTitleRepository } from './implementations/columns/FindColumnByTitleRepository';
import { FindColumnRepository } from './implementations/columns/FindColumnRepository';
import { FindColumnsByBoardIdRepository } from './implementations/columns/FindColumnsByBoardIdRepository';
import { InsertColumnRepository } from './implementations/columns/InsertColumnRepository';
import { UpdateColumnRepository } from './implementations/columns/UpdateColumnRepository';
import { FindFunnelsByListCodiRepository } from './implementations/funnels/FindFunnelsByListCodiRepository';
import { InsertPipelineDealHistoryRepository } from './implementations/history/InsertPipelineDealHistoryRepository';
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
import { RemoveLeadFromBlackListRepository } from './implementations/leadBlackList/RemoveLeadFromBlackListRepository';
import { UpsertLeadCaptureDataRepository } from './implementations/leadCaptureData/UpsertLeadCaptureDataRepository';
import { FindLeadCaptureFieldsByUserIdRepository } from './implementations/leadCaptureField/FindLeadCaptureFieldsByUserIdRepository';
import { FindLeadFromMachineByPhoneRepository } from './implementations/leads/FindLeadFromMachineByPhoneRepository';
import { FindLeadsByUsuaSistCodiRepository } from './implementations/leads/FindLeadsByUsuaSistCodiRepository';
import { InsertLeadOnWhatsAppMachineRepository } from './implementations/leads/InsertLeadOnWhatsAppMachineRepository';
import { InsertLeadRepository } from './implementations/leads/InsertLeadRepository';
import { InsertLeadTrackRepository } from './implementations/leadTrack/InsertLeadTrackRepository';
import { InsertTagsTrackRepository } from './implementations/leadTrack/InsertTagsTrackRepository';
import { RemoveTagsTrackRepository } from './implementations/leadTrack/RemoveTagsTrackRepository';
import { FindLeadUsuaSistByLeadCodiRepository } from './implementations/leadUsuaSists/FindLeadUsuaSistByLeadCodiRepository';
import { FindLeadUsuaSistRepository } from './implementations/leadUsuaSists/FindLeadUsuaSistRepository';
import { InsertLeadUsuaSistTagRepository } from './implementations/leadUsuaSistTags/InsertLeadUsuaSistTagRepository';
import { RemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository } from './implementations/leadUsuaSistTags/RemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository';
import { FindListsByUsuaSistCodiRepository } from './implementations/lists/FindListsByUsuaSistCodiRepository';
import { FindDefaultModelsByFuniCodiRepository } from './implementations/models/FindDefaultModelsByFuniCodiRepository';
import { FindMessengerModelsByFuniCodiRepository } from './implementations/models/FindMessengerModelsByFuniCodiRepository';
import { FindWhatsAppModelsByFuniCodiRepository } from './implementations/models/FindWhatsAppModelsByFuniCodiRepository';
import { RemoveCardNotificationRepository } from './implementations/notifications/RemoveCardNotificationRepository';
import { RemoveCardNotificationsRepository } from './implementations/notifications/RemoveCardNotificationsRepository';
import { RemoveColumnNotificationRepository } from './implementations/notifications/RemoveColumnNotificationRepository';
import { FindUsersByUsuaSistCodiRepository } from './implementations/users/FindUsersByUsuaSistCodiRepository';
import { IInsertTagsTrackRepository } from './models/leadTrack/IInsertTagsTrackRepository';

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

container.registerSingleton<IFindCardLayoutByBoardIdRepository>(
  'FindCardLayoutByBoardIdRepository',
  FindCardLayoutByBoardIdRepository
);

container.registerSingleton<IFindCardByBoardIdAndLeadCodiRepository>(
  'FindCardByBoardIdAndLeadCodiRepository',
  FindCardByBoardIdAndLeadCodiRepository
);

container.registerSingleton<IFindCardByColumnIdAndLeadCodiRepository>(
  'FindCardByColumnIdAndLeadCodiRepository',
  FindCardByColumnIdAndLeadCodiRepository
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

container.registerSingleton<IFindDefaultModelsByFuniCodiRepository>(
  'FindDefaultModelsByFuniCodiRepository',
  FindDefaultModelsByFuniCodiRepository
);

container.registerSingleton<IFindDefaultModelsByFuniCodiRepository>(
  'FindMessengerModelsByFuniCodiRepository',
  FindMessengerModelsByFuniCodiRepository
);

container.registerSingleton<IFindDefaultModelsByFuniCodiRepository>(
  'FindWhatsAppModelsByFuniCodiRepository',
  FindWhatsAppModelsByFuniCodiRepository
);

container.registerSingleton<IFindFunnelsByListCodiRepository>(
  'FindFunnelsByListCodiRepository',
  FindFunnelsByListCodiRepository
);

container.registerSingleton<IFindGainConversionRateGraphDataRepository>(
  'FindGainConversionRateGraphDataRepository',
  FindGainConversionRateGraphDataRepository
);

container.registerSingleton<IFindLeadCaptureFieldsByUserIdRepository>(
  'FindLeadCaptureFieldsByUserIdRepository',
  FindLeadCaptureFieldsByUserIdRepository
);

container.registerSingleton<IFindLeadFromMachineByPhoneRepository>(
  'FindLeadFromMachineByPhoneRepository',
  FindLeadFromMachineByPhoneRepository
);

container.registerSingleton<IFindLeadsByUsuaSistCodiRepository>(
  'FindLeadsByUsuaSistCodiRepository',
  FindLeadsByUsuaSistCodiRepository
);

container.registerSingleton<IFindLeadUsuaSistRepository>(
  'FindLeadUsuaSistRepository',
  FindLeadUsuaSistRepository
);

container.registerSingleton<IFindLeadUsuaSistByLeadCodiRepository>(
  'FindLeadUsuaSistByLeadCodiRepository',
  FindLeadUsuaSistByLeadCodiRepository
);

container.registerSingleton<IFindListsByUsuaSistCodiRepository>(
  'FindListsByUsuaSistCodiRepository',
  FindListsByUsuaSistCodiRepository
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

container.registerSingleton<IInsertCardRepository>(
  'InsertCardRepository',
  InsertCardRepository
);

container.registerSingleton<IInsertCardLayoutRepository>(
  'InsertCardLayoutRepository',
  InsertCardLayoutRepository
);

container.registerSingleton<IInsertColumnRepository>(
  'InsertColumnRepository',
  InsertColumnRepository
);

container.registerSingleton<IInsertLeadRepository>(
  'InsertLeadRepository',
  InsertLeadRepository
);

container.registerSingleton<IInsertLeadOnWhatsAppMachineRepository>(
  'InsertLeadOnWhatsAppMachineRepository',
  InsertLeadOnWhatsAppMachineRepository
);

container.registerSingleton<IInsertLeadTrackRepository>(
  'InsertLeadTrackRepository',
  InsertLeadTrackRepository
);

container.registerSingleton<IInsertLeadUsuaSistTagRepository>(
  'InsertLeadUsuaSistTagRepository',
  InsertLeadUsuaSistTagRepository
);

container.registerSingleton<IInsertPipelineDealHistoryRepository>(
  'InsertPipelineDealHistoryRepository',
  InsertPipelineDealHistoryRepository
);

container.registerSingleton<IInsertPipelineHistoryRepository>(
  'InsertPipelineHistoryRepository',
  InsertPipelineHistoryRepository
);

container.registerSingleton<IInsertReportFilterRepository>(
  'InsertReportFilterRepository',
  InsertReportFilterRepository
);

container.registerSingleton<IInsertTagsTrackRepository>(
  'InsertTagsTrackRepository',
  InsertTagsTrackRepository
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

container.registerSingleton<IRemoveLeadFromBlackListRepository>(
  'RemoveLeadFromBlackListRepository',
  RemoveLeadFromBlackListRepository
);

container.registerSingleton<IRemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository>(
  'RemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository',
  RemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository
);

container.registerSingleton<IRemoveReportFilterRepository>(
  'RemoveReportFilterRepository',
  RemoveReportFilterRepository
);

container.registerSingleton<IRemoveTagsTrackRepository>(
  'RemoveTagsTrackRepository',
  RemoveTagsTrackRepository
);

container.registerSingleton<ISumValueOfColumnsRepository>(
  'SumValueOfColumnsRepository',
  SumValueOfColumnsRepository
);

container.registerSingleton<ISumWonOpportunitiesGroupedByCreationDateRepository>(
  'SumWonOpportunitiesGroupedByCreationDateRepository',
  SumWonOpportunitiesGroupedByCreationDateRepository
);

container.registerSingleton<IUpdateBoardRepository>(
  'UpdateBoardRepository',
  UpdateBoardRepository
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

container.registerSingleton<IUpsertLeadCaptureDataRepository>(
  'UpsertLeadCaptureDataRepository',
  UpsertLeadCaptureDataRepository
);
