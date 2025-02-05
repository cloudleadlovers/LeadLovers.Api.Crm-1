import { StageStatus } from '@common/shared/enums/StageStatus';
import { LogData } from '@common/shared/types/LogData';

export type Stage = {
  id: number;
  crmId: number;
  name: string;
  color: string;
  order: number;
  status: StageStatus;
  estimatedRevenue: number;
  amountCards: number;
  earnedRevenue: number;
  createdAt: Date;
};

export type StageTemplate = {
  id: number;
  title: string;
  stage: Pick<Stage, 'id' | 'crmId' | 'name' | 'color' | 'order'>[];
};

export type FindStageFilter = {
  stage?: {
    in?: number[];
    notIn?: number[];
  };
};

export default interface IStageProvider {
  createStage(
    params: Pick<Stage, 'crmId' | 'name' | 'order' | 'color'>
  ): Promise<Pick<Stage, 'id'>>;
  deleteNotificationByStageId(stageId: number): Promise<void>;
  deleteStage(
    params: Pick<Stage, 'crmId' | 'id' | 'status'>
  ): Promise<Pick<Stage, 'name'> | undefined>;
  findStage(
    stageId: number
  ): Promise<Omit<Stage, 'amountCards' | 'earnedRevenue'> | undefined>;
  findStageByName(
    crmId: number,
    name: string
  ): Promise<Pick<Stage, 'id'> | undefined>;
  findStageTemplates(): Promise<StageTemplate[]>;
  findStagesByCRMId(crmId: number, filters?: FindStageFilter): Promise<Stage[]>;
  logStageCreation(
    stageId: number,
    userId: number,
    data: LogData,
    subUserId?: number
  ): Promise<void>;
  logStageRemoval(
    stageId: number,
    userId: number,
    data: LogData,
    subUserId?: number
  ): Promise<void>;
  logStageUpdating(
    stageId: number,
    userId: number,
    data: LogData,
    subUserId?: number
  ): Promise<void>;
  reorderOpportunitiesByPosition(
    stageId: number,
    position: number
  ): Promise<void>;
  updateStage(
    params: Pick<Stage, 'crmId' | 'id'> &
      Partial<
        Pick<Stage, 'name' | 'color' | 'status' | 'estimatedRevenue' | 'order'>
      >
  ): Promise<void>;
}
