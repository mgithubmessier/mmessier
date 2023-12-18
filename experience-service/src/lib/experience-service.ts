import { Experience } from '@mmessier/types';
import { Handler, APIGatewayEvent, APIGatewayProxyCallback } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { isNumber } from 'lodash';

export const handler: Handler = async (
  event: APIGatewayEvent,
  context,
  callback: APIGatewayProxyCallback
) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  const tableName = 'matthewmessier.com-experiences';
  const dyanmodb = new DynamoDB({ apiVersion: '2012-08-10' });
  const nextPageKey = '';
  try {
    const getPromise = new Promise<Array<Experience>>((resolve, reject) => {
      if (event.pathParameters['experienceID']) {
        dyanmodb.getItem(
          {
            TableName: tableName,
            Key: {
              uuid: {
                S: event.pathParameters['experienceID'],
              },
            },
          },
          (error, data) => {
            if (error) {
              reject(error);
            } else {
              console.log(
                `Successful get item data: ${JSON.stringify(data, null, 2)}`
              );
              // nextPageKey = data.LastEvaluatedKey
              resolve([]);
            }
          }
        );
      } else {
        const stringLimit = event.queryStringParameters['limit'];
        let numberLimit = 5;
        if (isNumber(stringLimit)) {
          numberLimit = Number(stringLimit);
          if (numberLimit > 20) {
            numberLimit = 20;
          }
        }
        // const experiences: Array<Experience> = [];
        dyanmodb.scan(
          {
            TableName: tableName,
            Limit: numberLimit,
          },
          (error, data) => {
            if (error) {
              reject(error);
            } else {
              console.log(
                `Successful get item data: ${JSON.stringify(data, null, 2)}`
              );
              data.Items.forEach(function () {
                // console.log(`Next item in table: ${element}`);
                // experiences.push()
              });
              // nextPageKey = data.LastEvaluatedKey
              resolve([]);
            }
          }
        );
      }
    });
    const experiences = await getPromise;
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        experiences,
        next_page_key: nextPageKey,
      }),
    });
  } catch (e) {
    const error: Error = e;
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    });
  }
};
