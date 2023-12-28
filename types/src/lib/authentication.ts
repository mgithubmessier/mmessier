import { BasePostResponse } from './response';

export type AuthenticationPostRequest = {
  ip: string;
};
export type AuthenticationPostResponse = BasePostResponse & {
  token?: string;
};
