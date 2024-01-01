import { verify } from 'jsonwebtoken';

export const isValidIP = (ip: string) => {
  return Boolean(ip.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/));
};

export const verifyJWTSessionToken = (
  token: string,
  ip: string,
  secret: string
) => {
  if (token && secret) {
    let decoded;
    try {
      decoded = verify(token, secret);
    } catch (e) {
      console.log(`Error: ${JSON.stringify(e, null, 2)}`);
      throw new Error('The server could not verify your request');
    }
    if (typeof decoded !== 'string') {
      if (!isValidIP(decoded.sub || '')) {
        console.log(`Error: JWT IP Address is invalid`);
        throw new Error('The request is invalid');
      }
      if (ip !== decoded.sub) {
        console.log(`Error: Client IP Address did not match IP within JWT`);
        throw new Error('The request is invalid');
      }
      return true;
    }
  }
  if (!token) {
    console.log(`Error: Token not provided`);
  }
  if (!secret) {
    console.log(`Error: Secret not provided`);
  }

  throw new Error('The server encountered a problem verifying your request');
};
