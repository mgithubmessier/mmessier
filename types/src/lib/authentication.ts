import { BasePostResponse } from './response';

export type AuthenticationPostResponse = BasePostResponse & {
  token?: string;
};
