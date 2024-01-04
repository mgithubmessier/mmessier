import {
  generatePolicy,
  verifyJWTSessionToken,
} from '@mmessier/service-utilities';
import {
  Handler,
  APIGatewayRequestAuthorizerEventV2,
  APIGatewayAuthorizerCallback,
} from 'aws-lambda';

export const handler: Handler = (
  event: APIGatewayRequestAuthorizerEventV2,
  _,
  callback: APIGatewayAuthorizerCallback
) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  if (event.type === 'REQUEST') {
    const authorization = event.identitySource[0];
    if (authorization === process.env.AUTHORIZER_API_KEY) {
      return callback(null, generatePolicy('user', 'Allow', event.routeArn));
    }
    try {
      verifyJWTSessionToken(
        authorization,
        event.headers['x-forwarded-for'],
        process.env.AUTHENTICATION_JWT_SECRET
      );
      return callback(null, generatePolicy('user', 'Allow', event.routeArn));
    } catch (e) {
      callback(null, generatePolicy('user', 'Deny', event.routeArn));
    }
    callback('Error: Invalid token');
  }
};
