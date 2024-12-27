export type User = {
  id: number;
  name: string;
  photo: string;
};

export interface IFindUsersByUsuaSistCodiRepository {
  find(usuaSistCodi: number): Promise<User[]>;
}
