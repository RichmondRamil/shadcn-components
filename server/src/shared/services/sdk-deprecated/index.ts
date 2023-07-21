// UTILS
import { decrypt } from '../../utils/crypto';
import RestService from './RestService';
import SoapServices from './SoapService';
import IAuthObj from './interfaces/IAuthObj';

export default class SDKServices {
	public rest: RestService;
	public soap: SoapServices;
	constructor(authObj: IAuthObj) {
		this.rest = new RestService(authObj);
		this.soap = new SoapServices(authObj);
	}
}
