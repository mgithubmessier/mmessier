import {
  AuthenticationPostRequest,
  AuthenticationPostResponse,
} from '@mmessier/types';
import {
  APIGatewayEvent,
  APIGatewayProxyCallbackV2,
  Handler,
} from 'aws-lambda';
import { sign } from 'jsonwebtoken';
import { isValidIP } from '@mmessier/service-utilities';

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
