// ============== INTERFACE ==============
export interface IApiRequestParams {
	action: string;
	req: Record<string, any>;
	key: string;
}

// ------------ REQUESTS ------------
export interface IRetrieveRequest {
	ObjectType: string;
	Properties: string[];
	ContinueRequest?: string;
	Filter?: IFilter;
	PartnerProperties?: string[];
	QueryAllAccounts?: boolean;
	RepeatLastResult?: any;
	RetrieveAllSinceLastBatch?: any;
	ClientIDs?: {
		ClientID: string | string[];
	};
	Options?: IRetrieveOptions;
}

export interface ICreateRequest {
	ObjectType: string;
	Properties: (string | IAPIObject)[];
	Options?: ICreateOptions;
	RequestID?: string;
}

export interface IUpdateRequest {
	Objects: IObjects[];
	Options?: IUpdateOptions;
	RequestID?: string;
}

export interface IDeleteRequest {
	ObjectType: string;
	Properties: (string | IAPIObject)[];
	Options?: IDeleteOptions;
	RequestID?: string;
}

export interface IScheduleRequest {
	Action: string;
	Interactions: string[];
	Options: IScheduleOptions;
	OverallStatus: string;
	OverallStatusMessage: string;
	RequestID: string;
	Schedule: string;
	ObjectType: string;
}

export interface IExecuteRequest {
	RequestID?: string;
	Requests?: {
		Client?: {
			ClientID: string | string[];
		};
		Name: string;
		Parameters?: { [key: string]: any };
	};
}

export interface IPerformRequest {
	Action: string;
	Definitions: IAPIObject[];
	Options: IPerformOptions;
	OverallStatus: string;
	OverallStatusMessage: string;
	RequestID?: string;
}

// ------------ OPTIONS ------------
export interface IRetrieveOptions extends IDefaultOptions {
	BatchSize?: number;
	IncludeObjects?: boolean;
	OnlyIncludeBase?: boolean;
	QueuePriority?: string;
}

export interface ICreateOptions extends IDefaultOptions {
	Container?: {
		ContainerID: string | string[];
	};
}

export interface IUpdateOptions extends IDefaultOptions {
	Container?: {
		ContainerID: string | string[];
	};
}

export interface IDeleteOptions extends IDefaultOptions {
	QueuePriority?: string;
}

export interface IScheduleOptions extends IDefaultOptions {
	QueuePriority?: string;
}

export interface IPerformOptions extends IDefaultOptions {
	Explanation?: string;
	QueuePriority?: string;
}

export interface IDefaultOptions {
	CallsInConversation?: number;
	Client?: {
		ClientID: string | string[];
	};
	ConversationID?: string;
	Priority?: string;
	RequestType?: string;
	SaveOptions?: any;
	ScheduledTime?: string;
	SendResponseTo?: any;
	SequenceCode?: string;
}

interface ISimpleFilter {
	Property: string;
	SimpleOperator: ISimpleOperator;
	Value: string;
}

interface IComplexFilter {
	LeftOperand: ISimpleFilter | IComplexFilter;
	LogicalOperator: 'AND' | 'OR';
	RightOperand: ISimpleFilter | IComplexFilter;
}

export type IFilter = ISimpleFilter | IComplexFilter;
// ============== ENUMS ==============

type ISimpleOperator =
	| 'equals'
	| 'notEquals'
	| 'greaterThan'
	| 'lessThan'
	| 'isNotNull'
	| 'isNull'
	| 'greaterThanOrEqual'
	| 'lessThanOrEqual'
	| 'between'
	| 'IN'
	| 'like';

// ============== EXTRAS ==============
interface IAPIObject {
	Client?: {
		ClientID: string | string[];
	};
	CorrelationID?: string;
	CreatedDate?: string;
	CustomerKey?: string;
	ID?: string;
	ModifiedDate?: string;
	ObjectID?: string;
	ObjectState?: string;
	Owner?: {
		OwnerID: string;
		OwnerType: string;
	};
	PartnerKey?: string;
	PartnerProperties?: {
		Name: string;
		Value: string;
	}[];
}

export interface IObjects {
	ObjectType: string;
	Properties: IAPIObject;
}
