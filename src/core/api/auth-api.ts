import axios, { AxiosResponse } from 'axios';
import { IUserCredentials } from '../interfaces/user-credentials.interface';
import { API_CONFIG } from '../constants/api-config';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class AuthApi {
  public static async login({ login, password }: IUserCredentials): Promise<AxiosResponse<unknown>> {
    return await axios.post<unknown>(`${API_CONFIG.url}/login`, { login, password });
  }
}
