// DEPENDENCIES
import axios from 'axios';
// CONFIG
import config from '../shared/config';

interface IRequestParams {
  url: string;
  data?: object;
  params?: object;
}
class APIService {
  protected baseURL: string = config.api.url;

  public buildURL(url: string): string {
    return this.baseURL + url;
  }

  public async get({ url, params }: IRequestParams) {
    const result = await axios.get(this.buildURL(url), { params });

    return result ? result.data : null;
  }
  public async post({ url, data, params }: IRequestParams) {
    const result = await axios.post(this.buildURL(url), data, { params });
    return result ? result.data : null;
  }
  public async put({ url, data, params }: IRequestParams) {
    const result = await axios.put(this.buildURL(url), data, { params });
    return result ? result.data : null;
  }
  public async remove({ url, params }: IRequestParams) {
    const result = await axios.delete(this.buildURL(url), { params });
    return result ? result.data : null;
  }
}

export default APIService;
