import { Experience, ExperienceGetResponse } from '@mmessier/types';
import { Handler, APIGatewayEvent, APIGatewayProxyCallback } from 'aws-lambda';
// import { DynamoDB } from 'aws-sdk';
// import { isNumber } from 'lodash';

const PAGE_LIMIT = 20;

export const handler: Handler = async (
  event: APIGatewayEvent,
  _,
  callback: APIGatewayProxyCallback
) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  try {
    const response: ExperienceGetResponse = {
      experiences: await getPromise,
      next_page_key: null,
      error: null,
    };
    if (nextPageKey) {
      response.next_page_key = Buffer.from(
        JSON.stringify(nextPageKey)
      ).toString('base64');
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
    });
  } catch (e) {
    const error: Error = e as Error;
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    });
  }
};
