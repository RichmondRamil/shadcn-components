// UTILS
import { decrypt } from '../../utils/crypto';
import RestService from './RestService';
import SoapServices from './SoapService';
import IAuthObj from './interfaces/IAuth';

export default class SDKServices {
  public rest: RestService;
  public soap: SoapServices;
  constructor(token: string) {
    const authObj: IAuthObj = decrypt(token);

    this.rest = new RestService(authObj);
    this.soap = new SoapServices(authObj);
  }
}
