import { Tag } from './IFindLeadTagsByUsuaSistCodiRepository';

export interface IInsertLeadTagRepository {
  insert(usuaSistCodi: number, tagName: string): Promise<Pick<Tag, 'id'>>;
}
