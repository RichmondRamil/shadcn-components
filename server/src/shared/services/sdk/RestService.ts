// DEPENDENCIES
import axios from 'axios';
import pLimit from 'p-limit';
// INTERFACES
<<<<<<< Updated upstream
import IAuthObj from './interfaces/IAuthObj';
=======
import IAuthObj from './interfaces/IAuth';
>>>>>>> Stashed changes

export default class RestService {
  private authObj: IAuthObj;

  constructor(authObjParams: IAuthObj) {
    this.authObj = authObjParams;
  }

  public async get(url: string) {
    return this._apiRequest({
      method: 'GET',
      url: url,
    });
  }

  public async getBulk(url: string, pageSize?: number, iteratorField?: any) {
    let page = 1;
    const baseUrl = url.split('?')[0];
    const isTransactionalMessageApi = _isTransactionalMessageApi(baseUrl);
    const isLegacyApi = _isLegacyApi(baseUrl);
    const queryParameters = new URLSearchParams(url.split('?')[1]);
    let collector;
    let shouldPaginate = false;
    let pageSizeKey = '$pageSize';
    let pageKey = '$page';
    let countKey = 'count';
    if (isLegacyApi) {
      pageSizeKey = '$top';
      pageKey = '$skip';
      countKey = 'totalResults';
      page = 0; // legacy index starts with 0
      if (pageSize != 50) {
        // values other than 50 are ignored by at least some of the sub-endpoints; while others have 50 as the maximum.
        pageSize = 50;
      }
    }
    queryParameters.set(pageSizeKey, Number(pageSize || 50).toString());
    do {
      queryParameters.set(pageKey, Number(page).toString());
      const responseBatch = await this._apiRequest({
        method: 'GET',
        url: baseUrl + '?' + decodeURIComponent(queryParameters.toString()),
      });
      if (iteratorField && Array.isArray(responseBatch[iteratorField])) {
        // if the iteratorField is set, use it
      } else if (Array.isArray(responseBatch.items)) {
        iteratorField = 'items';
      } else if (Array.isArray(responseBatch.definitions)) {
        iteratorField = 'definitions';
      } else if (Array.isArray(responseBatch.entry)) {
        iteratorField = 'entry';
      } else {
        throw new TypeError('Could not find an array to iterate over');
      }
      if (collector && Array.isArray(responseBatch[iteratorField])) {
        collector[iteratorField].push(...responseBatch[iteratorField]);
      } else if (!collector) {
        collector = responseBatch;
      }
      if (
        Array.isArray(collector[iteratorField]) &&
        collector[iteratorField].length >= responseBatch[countKey] &&
        (!isTransactionalMessageApi ||
          (isTransactionalMessageApi && responseBatch[countKey] != responseBatch[pageSizeKey]))
      ) {
        // ! the transactional message API returns a value for "count" that represents the currently returned number of records, instead of the total amount. checking for count != pageSize is a workaround for this
        // * opened Support Case #43988240 for this issue
        shouldPaginate = false;
      } else {
        page++;
        shouldPaginate = true;

        // TODO: add event handler for onLoop CONSOLE LOG
        // if (this.options?.eventHandlers?.onLoop) {
        //   // TODO in v1 change to undefined to ensure breaking changes considered
        //   // eslint-disable-next-line unicorn/no-null
        //   this.options.eventHandlers.onLoop(null, collector?.[iteratorField]);
        // }
      }
    } while (shouldPaginate);
    return collector;
  }

  public async getCollection(urlArray: string[], concurrentLimit: number) {
    const limit = pLimit(concurrentLimit || 5);

    return Promise.all(
      urlArray.map((url) =>
        limit(() =>
          this._apiRequest({
            method: 'GET',
            url: url,
          }),
        ),
      ),
    );
  }

  public async post(url: string, payload: any) {
    const requestOptions = {
      method: 'POST',
      url: url,
      data: payload,
    };
    return this._apiRequest(requestOptions);
  }

  public async put(url: string, payload: any) {
    const requestOptions = {
      method: 'PUT',
      url: url,
      data: payload,
    };

    return this._apiRequest(requestOptions);
  }

  public async patch(url: string, payload: any) {
    const requestOptions = {
      method: 'PATCH',
      url: url,
      data: payload,
    };
    return this._apiRequest(requestOptions);
  }

  public async deleteRequest(url: string) {
    const requestOptions = {
      method: 'DELETE',
      url: url,
    };
    return this._apiRequest(requestOptions);
  }

  private async _apiRequest(requestOptions: IRequestOptions) {
    const { method } = requestOptions;
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      // Check if there is a data object
      if (!requestOptions.data) {
        throw new Error(`Payload is missing from the ${method} options`);
      }
    }

    try {
      requestOptions.baseURL = this.authObj.rest_instance_url;
      requestOptions.headers = {
        Authorization: `Bearer ` + this.authObj.access_token,
      };

      const response = await axios(requestOptions);
      return response.data;

      // TODO: add logging for response FOR LATER
      //       if (this.options?.eventHandlers?.logResponse) {
      //         this.options.eventHandlers.logResponse({
      //           data: response.data,
      //           status: response.status,
      //         });
      //       }
    } catch (error) {
      throw error;
    }
  }
}

// ============== IN-BUILT FUNCTIONS ============== //
const _isLegacyApi = (url: string) => {
  return url && url.startsWith('/legacy/v1/');
};

const _isTransactionalMessageApi = (url: string) => {
  const transactionalApis = [
    '/messaging/v1/email/definitions',
    '/messaging/v1/push/definitions',
    '/messaging/v1/sms/definitions',
  ];

  return url && transactionalApis.some((api) => url.includes(api));
};

// ============= INTERFACES ============= //
interface IRequestOptions {
  method: string;
  url: string;
  data?: { [key: string]: any };
  params?: { [key: string]: any };
  headers?: any;
  baseURL?: string;
}
