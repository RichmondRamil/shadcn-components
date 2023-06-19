// DEPENDENCIES
import axios from 'axios';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';

// INTERFACES
import IAuthObj from './interfaces/IAuthObj';

// ============== UTILS FUNCTIONS ==============
export default class SoapService {
	private authObj: IAuthObj;
	constructor(authObjParams: IAuthObj) {
		this.authObj = authObjParams;
	}
	public async retrieve(retrieveRequest?: IRetrieveRequest) {
		if (!Array.isArray(retrieveRequest.Properties)) {
			throw new Error('Retrieve request requires one or more properties');
		}
		if (retrieveRequest.Filter) {
			retrieveRequest.Filter = this._parseFilter(retrieveRequest.Filter);
		}
		const soapBody = {
			RetrieveRequestMsg: {
				'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
				RetrieveRequest: retrieveRequest,
			},
		};

		return this._apiRequest({
			action: 'Retrieve',
			req: soapBody,
			key: 'RetrieveResponseMsg',
		});
	}

	public async retrieveBulk(retrieveRequest?: IRetrieveRequest) {
		let status;
		let resultsBulk;
		do {
			const resultsBatch = await this.retrieve(retrieveRequest);
			if (resultsBulk) {
				// once first batch is done, the follow just add to result payload
				resultsBulk.Results.push(...resultsBatch.Results);
			} else {
				resultsBulk = resultsBatch;
			}
			status = resultsBatch.OverallStatus;
			if (status === 'MoreDataAvailable') {
				if (retrieveRequest) {
					retrieveRequest.ContinueRequest = resultsBatch.RequestID;
				}
			}
		} while (status === 'MoreDataAvailable');
		return resultsBulk;
	}

	public async create(defaultRequest?: IDefaultRequest) {
		const soapBody = {
			CreateRequest: {
				'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
				Objects: { ...defaultRequest.properties, '@_xsi:type': defaultRequest.objectType },
				Options: defaultRequest.options || {},
			},
		};

		return await this._apiRequest({
			action: 'Create',
			req: soapBody,
			key: 'CreateResponse',
		});
	}

	public async update(defaultRequest?: IDefaultRequest) {
		const soapBody = {
			UpdateRequest: {
				'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
				Objects: {
					'@_xsi:type': defaultRequest.objectType,
					...defaultRequest.properties,
				},
				Options: defaultRequest.options || {},
			},
		};
		return await this._apiRequest({
			action: 'Update',
			req: soapBody,
			key: 'UpdateResponse',
		});
	}

	public async deleteMethod(defaultRequest: IDefaultRequest) {
		const soapBody = {
			DeleteRequest: {
				'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
				Objects: { '@_xsi:type': defaultRequest.objectType, ...defaultRequest.properties },
				Options: defaultRequest.options || {},
			},
		};
		return await this._apiRequest({
			action: 'Delete',
			req: soapBody,
			key: 'DeleteResponse',
		});
	}

	public async schedule(scheduleRequest: IScheduleRequest) {
		const soapBody: any = {
			ScheduleRequestMsg: {
				'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
				...scheduleRequest,
			},
		};

		if (Array.isArray(soapBody.ScheduleRequestMsg.Interactions)) {
			soapBody.ScheduleRequestMsg.Interactions = soapBody.ScheduleRequestMsg.Interactions.map((index) => {
				index.Interaction['@_xsi:type'] = scheduleRequest.ObjectType;
				return index;
			});
		} else if (
			typeof soapBody.ScheduleRequestMsg.Interactions === 'object' &&
			soapBody.ScheduleRequestMsg.Interactions !== null
		) {
			soapBody.ScheduleRequestMsg.Interactions.Interaction['@_xsi:type'] = scheduleRequest;
		} else {
			throw new TypeError('Interactions must be of Array or Object Type');
		}

		return await this._apiRequest({
			action: 'Schedule',
			req: soapBody,
			key: 'ScheduleResponseMsg',
		});
	}

	public async describe(type: string) {
		return await this._apiRequest({
			action: 'Describe',
			req: {
				DefinitionRequestMsg: {
					'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
					DescribeRequests: {
						ObjectDefinitionRequest: {
							ObjectType: type,
						},
					},
				},
			},
			key: 'DefinitionResponseMsg',
		});
	}

	public async execute(type: string, properties: string[]) {
		return await this._apiRequest({
			action: 'Execute',
			req: {
				ExecuteRequestMsg: {
					'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
					Requests: {
						Name: type,
						Parameters: properties,
					},
				},
			},
			key: 'ExecuteResponseMsg',
		});
	}

	public async perform(type: string, action: string, definition: { [key: string]: any }) {
		definition['@_xsi:type'] = type;

		return await this._apiRequest({
			action: 'Perform',
			req: {
				PerformRequestMsg: {
					'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
					Action: action,
					Definitions: [
						{
							Definition: definition,
						},
					],
				},
			},
			key: 'PerformResponseMsg',
		});
	}

	public configure(type: string, configArray: []) {
		if (!Array.isArray(configArray) || configArray?.length == 0) {
			throw new Error('Configure request requires one or more entries');
		}
		const body = {
			ConfigureRequestMsg: {
				'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
				Action: 'assign',
				Configurations: { Configuration: configArray },
			},
		};

		configArray.forEach((configuration: any) => {
			configuration['@_xsi:type'] = type;
		});

		return this._apiRequest({
			action: 'Configure',
			req: body,
			key: 'ConfigureResponseMsg',
		});
	}

	private _buildEnvelope(request: any, token: string) {
		const jsonToXml = new XMLBuilder({ ignoreAttributes: false });
		return jsonToXml.build({
			Envelope: {
				Body: request,
				'@_xmlns': 'http://schemas.xmlsoap.org/soap/envelope/',
				'@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
				Header: {
					fueloauth: {
						'@_xmlns': 'http://exacttarget.com',
						'#text': token,
					},
				},
			},
		});
	}

	private _parseFilter(filter: any) {
		let filterType = 'Simple';
		const obj: any = {};

		if (typeof filter.leftOperand === 'object' && typeof filter.rightOperand === 'object') {
			filterType = 'Complex';
		}

		switch (filterType.toLowerCase()) {
			case 'simple':
				obj.Property = filter.leftOperand;
				obj.SimpleOperator = filter.operator;
				obj.Value = filter.rightOperand;
				break;
			case 'complex':
				obj.LeftOperand = this._parseFilter(filter.leftOperand);
				obj.LogicalOperator = filter.operator;
				obj.RightOperand = this._parseFilter(filter.leftOperand);
				break;
		}

		obj['@_xsi:type'] = filterType + 'FilterPart';

		return obj;
	}

	private _parseResponse(response: Record<string, any>, key: any) {
		const xmlToJson = new XMLParser({ ignoreAttributes: true });
		const soapBody = xmlToJson.parse(response.data)?.['soap:Envelope']?.['soap:Body'];
		if (soapBody?.[key]) {
			// Results should always be an array
			if (soapBody[key].Results && typeof soapBody[key].Results === 'object') {
				soapBody[key].Results = [soapBody[key].Results];
			}
			// checks overall status error
			if (
				['Error', 'Has Errors'].includes(soapBody[key].OverallStatus) ||
				soapBody[key].OverallStatus?.startsWith('Error:')
			) {
				throw new SOAPError(null, response, soapBody[key]);
			}
			return soapBody[key];
		}
		// something else went wrong but payload parsed
		throw new SOAPError(null, response, soapBody);
	}

	private async _apiRequest(options: IApiRequestParams) {
		const requestOptions = {
			method: 'POST',
			baseURL: this.authObj.soap_instance_url,
			url: '/Service.asmx',
			headers: {
				SOAPAction: options.action,
				'Content-Type': 'text/xml',
			},
			data: this._buildEnvelope(options.req, this.authObj.access_token),
		};
		const response = await axios(requestOptions).catch((error) => {
			this._parseResponse(error.response, options.key);
		});

		return response ? this._parseResponse(response, options.key) : null;

		// TODO: CREATE THE LOGGER FOR THIS ONE
		// if (this.options?.eventHandlers?.logResponse) {
		//   this.options.eventHandlers.logResponse({
		//     data: response.data,
		//     status: response.status,
		//     statusText: response.statusText,
		//     headers: response.headers,
		//   });
		// }
	}
}

// ==================== IN-BUILT FUNCTIONS ====================

// ============== ENUMS ==============
enum EOperator {
	equals = 'equals',
	notEquals = 'notEquals',
	greaterThan = 'greaterThan',
	lessThan = 'lessThan',
	isNotNull = 'isNotNull',
	isNull = 'isNull',
	greaterThanOrEqual = 'greaterThanOrEqual',
	lessThanOrEqual = 'lessThanOrEqual',
	between = 'between',
	IN = 'IN',
	like = 'like',
}

// ============== INTERFACE ==============
interface IApiRequestParams {
	action: string;
	req: Record<string, any>;
	key: string;
}

interface IFilter {
	leftOperand: string;
	operator: EOperator;
	rightOperand: string;
}

interface IRetrieveOptions {
	BatchSize?: number;
	IncludeObjects?: boolean;
	OnlyIncludeBase?: boolean;
	CallsInConversation?: number;
	ConversationID?: string;
	Priority?: string;
	RequestType?: string;
	SaveOptions?: any;
	ScheduledTime?: string;
	SendResponseTo?: any;
	SequenceCode?: string;
}

interface IDefaultOptions {
	CallsInConversation?: number;
	ConversationID?: string;
	Priority?: string;
	RequestType?: string;
	SaveOptions?: any;
	ScheduledTime?: string;
	SendResponseTo?: any;
	SequenceCode?: string;
}

interface IRetrieveRequest {
	ClientIDs?: {
		Client: {
			ID: string;
		};
	};
	ContinueRequest?: string;
	Filter?: IFilter;
	ObjectType: string;
	Options?: IRetrieveOptions;
	PartnerProperties?: string[];
	Properties: string[];
	QueryAllAccounts?: boolean;
	RepeatLastResult?: any;
	RetrieveAllSinceLastBatch?: boolean;
}

interface IDefaultRequest {
	objectType: string;
	properties: string[];
	options?: IDefaultOptions;
}

interface IScheduleRequest {
	Action: string;
	Interactions: string[];
	Options: IDefaultOptions;
	OverallStatus: string;
	OverallStatusMessage: string;
	RequestID: string;
	Schedule: string;
	ObjectType: string;
}

// ============== INTERFACE ==============
class SOAPError extends Error {
	code;
	response;
	json;
	constructor(ex: any, response?: any, soapBody?: any) {
		const responseStatus = response?.status;
		// Content Error
		if (soapBody && ['Error', 'Has Errors'].includes(soapBody.OverallStatus)) {
			super('One or more errors in the Results');
			this.code = soapBody.OverallStatus;
		}
		// Payload Error
		else if (soapBody && soapBody['soap:Fault']) {
			const fault = soapBody['soap:Fault'];
			super(fault.faultstring);
			this.code = fault.faultcode;
		}
		// Request Error
		else if (responseStatus > 299) {
			super('Error with SOAP Request');
			this.code = response?.status;
		}
		// unsupported handler
		else if (soapBody?.OverallStatus?.startsWith('Error:')) {
			super(soapBody.OverallStatus.split('Error:')[1].trim());
			this.code = 'Error';
		}
		// Fallback Error
		else if (ex) {
			super(ex.message);
			this.code = ex.code;
		}
		// Fallback Unknown Error
		else {
			super('Unknown Error');
			this.code = '520';
		}

		// ! PLEASE LEARN THIS MORE WE CAN USE THIS TO LOG THE ERROR ALSO
		// this.response = response;
		this.json = soapBody;
		this.name = this.constructor.name;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, SOAPError);
		}
	}
}
