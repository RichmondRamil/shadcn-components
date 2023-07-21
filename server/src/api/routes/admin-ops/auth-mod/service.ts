// DEPENDENCIES
import { Service } from 'typedi';
import axios from 'axios';
// CONFIG
import config from '../../../../config';
// UTILS
import { encrypt, decrypt } from '../../../../shared/utils/crypto';
// INTERFACES
interface IAuthObj {
	access_token: string;
	refresh_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
	rest_instance_url: string;
	soap_instance_url: string;
	tssd?: string;
	expiration?: number;
}
@Service()
export default class AuthService {
	public async requestToken(code: string): Promise<{ token: string; expiration: Date }> {
		try {
			const payload = {
				grant_type: 'authorization_code',
				client_id: config.sfmc.clientId,
				client_secret: config.sfmc.clientSecret,
				redirect_uri: config.sfmc.redirectUri,
				account_id: config.sfmc.accountId,
				code: code,
			};

			const result = await axios({
				method: 'post',
				url: `https://${config.sfmc.tenantId}.auth.marketingcloudapis.com/v2/token`,
				data: payload,
			}).catch((err) => {
				throw err.response.data;
			});

			const expirationFromToken = new Date(new Date().getTime() + result.data.expires_in * 1000);

			return { token: encrypt(result.data), expiration: expirationFromToken };
		} catch (e) {
			throw e;
		}
	}

	public async refreshToken(code: string): Promise<{ token: string; expiration: Date }> {
		try {
			// Decrypt the token
			const authObj: IAuthObj = decrypt(code);

			// If the tenant is present in the authObj, use it, otherwise use the config
			config.sfmc.tenantId = authObj.tssd ? authObj.tssd : config.sfmc.tenantId;

			const payload = {
				grant_type: 'refresh_token',
				client_id: config.sfmc.clientId,
				client_secret: config.sfmc.clientSecret,
				redirect_uri: config.sfmc.redirectUri,
				account_id: config.sfmc.accountId,
				refresh_token: authObj.refresh_token,
			};

			const result = await axios({
				method: 'post',
				url: `https://${config.sfmc.tenantId}.auth.marketingcloudapis.com/v2/token`,
				data: payload,
			}).catch((err) => {
				throw err.response.data;
			});

			const expirationFromToken = new Date(new Date().getTime() + result.data.expires_in * 1000);

			return { token: encrypt(result.data), expiration: expirationFromToken };
		} catch (e) {
			throw e;
		}
	}
}
