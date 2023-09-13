/* eslint-disable @typescript-eslint/no-explicit-any */
// DEPENDENCIES
import axios from 'axios';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';

// INTERFACES
import IAuthObj from './interfaces/IAuth';
import {
	IRetrieveRequest,
	IScheduleRequest,
	IApiRequestParams,
	IFilter,
	ICreateRequest,
	IExecuteRequest,
	IDeleteRequest,
	IUpdateRequest,
	IObjects,
	IDefaultResponse,
} from './interfaces/ISoap';

// ============== UTILS FUNCTIONS ==============
export default class SoapService {
	private authObj: IAuthObj;
	constructor(authObjParams: IAuthObj) {
		this.authObj = authObjParams;
	}
	public async retrieve(retrieveRequest: IRetrieveRequest): Promise<IDefaultResponse> {
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

	public async retrieveBulk(retrieveRequest: IRetrieveRequest): Promise<IDefaultResponse> {
		let status;
		let resultsBulk;
		do {
			const resultsBatch = await this.retrieve(retrieveRequest);
			if (resultsBulk) {
				// once first batch is done, the follow just add to result payload
				resultsBulk.Results[0].push(...resultsBatch.Results[0]);
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

	public async create(createRequest: ICreateRequest): Promise<IDefaultResponse> {
		if (!Array.isArray(createRequest.Objects)) {
			throw new Error('Objects must be an array');
		}

		const tempObj = createRequest.Objects.map((element: IObjects) => {
			return {
				'@_xsi:type': element.ObjectType,
				...element.Properties,
			};
		});

		const soapBody = {
			CreateRequest: {
				'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
				Objects: tempObj,
				Options: createRequest.Options || {},
			},
		};

		return await this._apiRequest({
			action: 'Create',
			req: soapBody,
			key: 'CreateResponse',
		});
	}

	public async update(updateRequest: IUpdateRequest): Promise<IDefaultResponse> {
		if (!Array.isArray(updateRequest.Objects)) {
			throw new Error('Objects must be an array');
		}
		const tempObj = updateRequest.Objects.map((element: IObjects) => {
			return {
				'@_xsi:type': element.ObjectType,
				...element.Properties,
			};
		});

		const soapBody = {
			UpdateRequest: {
				'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
				Objects: tempObj,
				Options: updateRequest.Options || {},
			},
		};
		return await this._apiRequest({
			action: 'Update',
			req: soapBody,
			key: 'UpdateResponse',
		});
	}

	public async deleteMethod(deleteRequest: IDeleteRequest): Promise<IDefaultResponse> {
		const soapBody = {
			DeleteRequest: {
				'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
				Objects: { '@_xsi:type': deleteRequest.ObjectType, ...deleteRequest.Properties },
				Options: deleteRequest.Options || {},
			},
		};
		return await this._apiRequest({
			action: 'Delete',
			req: soapBody,
			key: 'DeleteResponse',
		});
	}

	public async schedule(scheduleRequest: IScheduleRequest): Promise<IDefaultResponse> {
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

	public async execute(executeRequest: IExecuteRequest) {
		return await this._apiRequest({
			action: 'Execute',
			req: {
				ExecuteRequestMsg: {
					'@_xmlns': 'http://exacttarget.com/wsdl/partnerAPI',
					Requests: {
						Name: executeRequest.Requests.Name,
						Parameters: executeRequest.Requests.Parameters,
					},
				},
			},
			key: 'ExecuteResponseMsg',
		});
	}

	// !!!!FIX TYPE INTERFACE HERE THERES ALREADY A TYPE INTERFACE ON THE ISOAP API
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
		const xmlSoapEnvelope = jsonToXml.build({
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
		return xmlSoapEnvelope;
	}

	private _parseFilter(filter: IFilter) {
		const obj: any = {};

		if ('LeftOperand' in filter && 'RightOperand' in filter) {
			obj.LeftOperand = this._parseFilter(filter.LeftOperand);

			obj.LogicalOperator = filter.LogicalOperator;
			obj.RightOperand = this._parseFilter(filter.RightOperand);
			obj['@_xsi:type'] = 'ComplexFilterPart';
		} else {
			obj.Property = filter.Property;
			obj.SimpleOperator = filter.SimpleOperator;
			obj.Value = filter.Value;
			obj['@_xsi:type'] = 'SimpleFilterPart';
		}
		return obj;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

	private async _apiRequest(options: IApiRequestParams): Promise<IDefaultResponse> {
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
