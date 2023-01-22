export interface IUser {
  id: number;
  name: string;
  address: IUserAddress;
}

export interface IUserAddress {
  street: string;
  city: string;
}
