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

export type FindStageFilter = {
  stage?: {
    in?: number[];
    notIn?: number[];
  };
};

export default interface IStageProvider {
  findStagesByCRMId(crmId: number, filters?: FindStageFilter): Promise<Stage[]>;
}
