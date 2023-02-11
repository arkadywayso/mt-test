import { IUser } from '../interfaces/user.interface';
import axios, { AxiosResponse } from 'axios';
import { API_CONFIG } from '../constants/api-config';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UsersApi {
  public static async getUsers({ limit, page }: { limit: number; page: number }): Promise<AxiosResponse<IUser[]>> {
    return await axios.get<IUser[]>(`${API_CONFIG.url}/users?_limit=${limit}&_page=${page}`);
  }

  public static async getUser(id: number): Promise<AxiosResponse<IUser>> {
    return await axios.get<IUser>(`${API_CONFIG.url}/users/${id}`);
  }

  public static async editUser(id: number, user: IUser): Promise<AxiosResponse<IUser>> {
    return await axios.put<IUser>(`${API_CONFIG.url}/users/${id}`, user);
  }

  public static async addUser(user: IUser): Promise<AxiosResponse<IUser>> {
    return await axios.post<IUser>(`${API_CONFIG.url}/users`);
  }
}
