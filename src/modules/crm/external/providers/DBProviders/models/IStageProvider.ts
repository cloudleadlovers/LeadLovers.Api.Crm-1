import { LogData } from '@common/shared/types/LogData';

export type Stage = {
  id: number;
  crmId: number;
  name: string;
  color: string;
  order: number;
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
}
