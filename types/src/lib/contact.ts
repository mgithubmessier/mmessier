import { BaseGetResponse, BasePostResponse } from './response';

export type Contact = {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  ipAddress: string;
};

export type ContactGetResponse = BaseGetResponse & {
  contacts: Array<Contact>;
};

export type ContactPostRequest = {
  contact: Contact;
};
export type ContactPostResponse = BasePostResponse & {
  contact?: Contact;
};
