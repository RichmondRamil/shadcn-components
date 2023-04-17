// DEPENDENCIES
import axios from 'axios';

interface IRequestParams {
  url: string;
  method: string;
  data?: any;
  params?: object;
}

export const requestApiService = async ({
  url,
  method,
  data,
  params,
}: IRequestParams) => {
  try {
    const buildURL = `/api/${url}`;

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
