export default interface IAuth {
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
