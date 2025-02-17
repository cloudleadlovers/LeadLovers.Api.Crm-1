export type Tag = {
  id: number;
  name: string;
  tagChecked: boolean;
};

export interface IFindLeadTagsByUsuaSistCodiRepository {
  find(usuaSistCodi: number): Promise<Tag[]>;
}
