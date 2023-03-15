import APIService from '@/services/API/APIService';

export default class PrivateService extends APIService {
  constructor() {
    super();
    this.baseURL += '/private';
  }
}
