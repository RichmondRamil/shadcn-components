// DEPENDENCIES
import axios from 'axios';
// CONFIG
import APPConfig from '@/shared/config/index';
class APIService {
  protected baseURL: string;

  constructor(url: string = '') {
    //set the default api url properly
    this.baseURL = url && url.length > 0 ? url : APPConfig.API_URL;

    let currentConfig: any = null;
    // Add a request interceptor
    axios.interceptors.request.use(async (config) => {
      //get the token
      const token = localStorage.getItem('accessToken');
      //get the current config so that we can call the method if there is a token expired error
      //do not get the config for refresh token call, because it means that it's refreshing the token
      if (this.baseURL + '/auth/refresh-token' !== config.url)
        currentConfig = config;

      if (token && token.length > 0 && token != 'undefined')
        if (config.headers) {
          config.headers.Authorization = 'Bearer ' + token;
        }
      return config;
    });

    //add common handlers
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        //handle errors here
        if (error.response) {
          if (error.response.status === 401) {
            if (error.response.data.message === 'jwt expired') {
              const data = {
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken'),
              };
              const result = await axios.post(
                APPConfig.API_URL + '/app/auth/refresh-token',
                data
              );
              if (result.data.accessToken) {
                // set the new access token
                localStorage.setItem('accessToken', result.data.accessToken);
              }
              //call the method again

              return axios(currentConfig);
            } else {
              //logout
              localStorage.clear();
              return Promise.reject(error);
            }
          } else {
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  buildURL = (method: string): string => {
    return this.baseURL + '/' + method;
  };

  get = async (method: string) => {
    return await axios.get(this.buildURL(method));
  };

  post = async (method: string, data: any) => {
    try {
      return await axios.post(this.buildURL(method), data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  put = async (method: string, data: any) => {
    return await axios.put(this.buildURL(method), data);
  };

  delete = async (method: string, data?: any) => {
    return await axios.delete(this.buildURL(method), data);
  };
}

export default APIService;
