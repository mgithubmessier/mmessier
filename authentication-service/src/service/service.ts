import {
  AuthenticationPostRequest,
  AuthenticationPostResponse,
} from '@mmessier/types';
import {
  APIGatewayEvent,
  APIGatewayProxyCallbackV2,
  Handler,
} from 'aws-lambda';
import {
  sign,
  // verify
} from 'jsonwebtoken';

const isValidIP = (ip: string) => {
  return Boolean(ip.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/));
};

const createJWTSessionToken = (ip: string, secret: string) => {
  if (secret) {
    if (!isValidIP(ip)) {
      throw new Error('There was a problem signing the request');
    }
    return sign(
      {
        sub: ip,
      },
      secret,
      { expiresIn: '30 minutes' }
    );
  }
  throw new Error('The server encountered a problem signing your request');
};

// const verifyJWTSessionToken = (token: string, ip: string, secret: string) => {
//   if (token && process.env.mmessierNextJSJWTSecret) {
//     let decoded;
//     try {
//       decoded = verify(token, configuration.mmessierNextJSJWTSecret);
//     } catch (e) {
//       throw new Error('The server could not verify your request');
//     }
//     if (typeof decoded !== 'string') {
//       if (ip === decoded.sub && isValidIP(decoded.sub || '')) {
//         return true;
//       }
//       throw new Error('The request is invalid');
//     }
//   }
//   throw new Error('The server encountered a problem verifying your request');
// };

export const handler: Handler = async (
  event: APIGatewayEvent,
  _,
  callback: APIGatewayProxyCallbackV2
) => {
  const secret = process.env.AUTHENTICATION_JWT_SECRET;
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  try {
    if (event.httpMethod.toUpperCase() === 'POST') {
      const auth: AuthenticationPostRequest = JSON.parse(event.body);
      const token = createJWTSessionToken(auth.ip, secret);
      const response: AuthenticationPostResponse = {
        token,
      };
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      });
    }
  } catch (e) {
    console.log(`Error: ${JSON.stringify(e, null, 2)}`);
    const error: Error = e as Error;
    const response: AuthenticationPostResponse = {
      error: error.message,
    };
    callback(null, {
      statusCode: 500,
      body: JSON.stringify(response),
    });
  }
};
