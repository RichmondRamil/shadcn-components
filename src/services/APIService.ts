// DEPENDENCIES
import axios, { AxiosRequestConfig } from 'axios';
// CONFIG
import config from '../shared/config';

interface IRequestParams {
  url: string;
  data?: object;
  params?: object;
  headers?: object;
}
class APIService {
  protected baseURL: string = config.api.url;

  public buildURL(url: string): string {
    return this.baseURL + url;
  }

  public async get({ url, params, headers }: IRequestParams) {
    const config: AxiosRequestConfig = { params, headers };
    const result = await axios.get(this.buildURL(url), config);

    return result ? result.data : null;
  }

  public async post({ url, data, params, headers }: IRequestParams) {
    const config: AxiosRequestConfig = { params, headers };
    const result = await axios.post(this.buildURL(url), data, config);
    return result ? result.data : null;
  }

  public async put({ url, data, params, headers }: IRequestParams) {
    const config: AxiosRequestConfig = { params, headers };
    const result = await axios.put(this.buildURL(url), data, config);
    return result ? result.data : null;
  }

  public async remove({ url, data }: IRequestParams) {
    const config: AxiosRequestConfig = { data };
    const result = await axios.delete(this.buildURL(url), config);
    return result ? result.data : null;
  }
}

export default APIService;