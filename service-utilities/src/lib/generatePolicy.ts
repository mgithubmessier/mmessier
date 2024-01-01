import { APIGatewayAuthorizerResult, PolicyDocument } from 'aws-lambda';

// Help function to generate an IAM policy
export const generatePolicy = (
  principalId: string,
  effect: 'Allow' | 'Deny',
  resource: string
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
