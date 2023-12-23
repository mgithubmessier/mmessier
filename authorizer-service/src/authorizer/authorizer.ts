import {
  Handler,
  APIGatewayRequestAuthorizerEventV2,
  APIGatewayAuthorizerCallback,
  PolicyDocument,
  APIGatewayAuthorizerResult,
} from 'aws-lambda';

// Help function to generate an IAM policy
const generatePolicy = (
  principalId: string,
  effect: 'Allow' | 'Deny',
  resource
): APIGatewayAuthorizerResult => {
  const policyDocument: PolicyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  };

  return {
    policyDocument,
    principalId,
    context: {},
  };
};

export const handler: Handler = (
  event: APIGatewayRequestAuthorizerEventV2,
  _,
  callback: APIGatewayAuthorizerCallback
) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const API_KEY = process.env.AUTHORIZER_API_KEY || '';
  if (event.type === 'REQUEST') {
    const authorization = event.identitySource[0];
    if (authorization === API_KEY) {
      callback(null, generatePolicy('user', 'Allow', event.routeArn));
    } else {
      callback(null, generatePolicy('user', 'Deny', event.routeArn));
    }
  } else {
    callback('Error: Invalid token');
  }
};
