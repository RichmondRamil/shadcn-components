import APIService from './APIService';

class AdminService extends APIService {
  constructor() {
    super();
    this.baseURL += '/admin';
  }

  public async getAdmins(id: number) {
    return await this.get({ url: 'admins', params: { id } });
  }
}

export default AdminService;
