import {
  Handler,
  APIGatewayAuthorizerEvent,
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
  event: APIGatewayAuthorizerEvent,
  _,
  callback: APIGatewayAuthorizerCallback
) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const API_KEY = process.env.EXPERIENCE_API_KEY;
  if (event.type === 'REQUEST') {
    const authorization = event.headers.Authorization;
    if (authorization === API_KEY) {
      callback(null, generatePolicy('user', 'Allow', event.methodArn));
    } else {
      callback(null, generatePolicy('user', 'Deny', event.methodArn));
    }
  } else {
    callback('Error: Invalid token');
  }
};
