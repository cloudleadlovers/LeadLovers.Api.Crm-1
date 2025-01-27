import { LogType } from '@common/shared/enums/LogType';

export type InsertPipelineDealHistoryParams = {
  type: LogType;
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
