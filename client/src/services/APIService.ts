// DEPENDENCIES
import axios from 'axios';
interface IRequestParams {
  url: string;
  method: string;
  data?: object;
  params?: object;
}
import config from '../shared/config';

export const requestApiService = async ({
  url,
  method,
  data,
  params,
}: IRequestParams) => {
  try {
    const buildURL = `${config.API_URL}/${url}`;

    const resultApiRequest = await axios({
      method: method,
      url: buildURL,
      data,
      params,
    });
    return resultApiRequest.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
