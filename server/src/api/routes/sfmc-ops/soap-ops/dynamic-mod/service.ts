// DEPENDENCIES
import { Service } from 'typedi';
// CONFIG
// SERVICES
import SDKServices from '../../../../../shared/services/sdk';
import { IRetrieveRequest, IUpdateRequest } from '@/shared/services/sdk/interfaces/ISoap';

interface IDynamicBody {
	Retrieve: IRetrieveRequest;
	Describe: string;
	Update: IUpdateRequest;
}
@Service()
export default class AuthService {
	public async dynamic(body: IDynamicBody, token: string): Promise<any> {
		try {
			const sdkService = new SDKServices(token);
			const { Retrieve, Describe, Update } = body;

			let result;
			if (Retrieve) {
				result = await sdkService.soap.retrieve(Retrieve);
			} else if (Describe) {
				result = await sdkService.soap.describe(Describe);
			} else if (Update) {
				result = await sdkService.soap.update(Update);
			} else {
				throw new Error('No method was provided');
			}
			return result;
		} catch (e) {
			throw e;
		}
	}
}
