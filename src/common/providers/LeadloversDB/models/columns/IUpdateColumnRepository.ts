import { ColumnStatus } from '@common/shared/enums/ColumnStatus';

export type UpdateColumnParams = {
  boardId: number;
  columnId: number;
  title?: string;
  color?: string;
  status?: ColumnStatus;
  value?: number;
  order?: number;
};

export interface IUpdateColumnRepository {
  update(params: UpdateColumnParams): Promise<void>;
}
