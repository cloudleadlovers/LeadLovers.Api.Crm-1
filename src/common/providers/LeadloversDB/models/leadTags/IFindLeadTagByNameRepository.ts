import { Tag } from './IFindLeadTagsByUsuaSistCodiRepository';

export interface IFindLeadTagByNameRepository {
  find(usuaSistCodi: number, name: string): Promise<Tag | undefined>;
}
