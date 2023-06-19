export interface IDescribeResponse {
  ObjectDefinition: {
    ObjectType: string;
    Properties: IPropertiesOfObjectDefinition[];
  };
  RequestID: string;
}

export interface IPropertiesOfObjectDefinition {
  DataType: string;
  IsRequired: boolean;
  IsRetrievable: boolean;
  IsUpdatable: boolean;
  Name: string;
  ObjectID: string;
  PartnerKey: string;
}
