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
      throw new Error('The server could not verify your request');
    }
    if (typeof decoded !== 'string') {
      if (ip === decoded.sub && isValidIP(decoded.sub || '')) {
        return true;
      }
      throw new Error('The request is invalid');
    }
  }
  throw new Error('The server encountered a problem verifying your request');
};
