import { OpportunityLog } from '@common/shared/enums/LogType';

export type InsertPipelineDealHistoryParams = {
  type: OpportunityLog;
  dealId?: number;
  columnSourceId?: number;
  columnDestinationId?: number;
  dealDataBefore?: string;
  dealDataAfter?: string;
  annotationId?: number;
  usuaSistCodi: number;
  acesCodi?: number;
};

export interface IInsertPipelineDealHistoryRepository {
  insert(params: InsertPipelineDealHistoryParams): Promise<void>;
}
