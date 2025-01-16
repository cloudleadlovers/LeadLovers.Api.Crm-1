import { LogType } from '@common/shared/enums/LogType';

export type InsertPipelineHistoryParams = {
  groupId?: number;
  boardId?: number;
  columnId?: number;
  cardId?: number;
  usuaSistCodi: number;
  acesCodi?: number;
  type: LogType;
  data: string;
};

export interface IInsertPipelineHistoryRepository {
  insert(params: InsertPipelineHistoryParams): Promise<void>;
}
