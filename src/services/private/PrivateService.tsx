import APIService from '../APIService';

export default class PrivateService extends APIService {
  constructor() {
    super();
    this.baseURL += '/private';
  }
}
