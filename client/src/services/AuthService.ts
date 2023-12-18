/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axios, { AxiosResponse } from 'axios';
import AdminService from './AdminService';

class AuthService extends AdminService {
  constructor() {
    super();
    this.baseURL += '/auth';
  }

  private async sendPostRequest(url: string, data: any): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(`${this.baseURL}${url}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getToken(code: string): Promise<any> {
    try {
      return await this.sendPostRequest('/request-token', { code });
    } catch (error) {
      throw error;
    }
  }

  public async getRefreshToken(code: string): Promise<any> {
    try {
      return await this.sendPostRequest('/refresh-token', { code });
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
