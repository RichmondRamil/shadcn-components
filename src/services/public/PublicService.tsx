import APIService from '../APIService';

export default class PublicService extends APIService {
  constructor() {
    super();
    this.baseURL += '/public';
  }
}
