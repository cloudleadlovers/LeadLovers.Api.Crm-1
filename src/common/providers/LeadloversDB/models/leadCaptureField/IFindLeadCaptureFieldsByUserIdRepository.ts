export type LeadCaptureField = {
  id: number;
  userId: number;
  typeId: number;
  type: string;
  statusId: number;
  name: string;
  label: string;
  tag: string;
  createdAt: Date;
};

export interface IFindLeadCaptureFieldsByUserIdRepository {
  find(userId: number): Promise<LeadCaptureField[]>;
}
