export type UpsertLeadCaptureDataParams = {
  leadUsuaSistCodi: number;
  fieldId: number;
  fieldType: number;
  fieldName: string;
  fieldTag: string;
  fieldValue: string;
};

export interface IUpsertLeadCaptureDataRepository {
  upsert(params: UpsertLeadCaptureDataParams): Promise<void>;
}
