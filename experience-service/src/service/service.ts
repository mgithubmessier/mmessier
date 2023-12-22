import { Experience, ExperienceGetResponse } from '@mmessier/types';
import { Handler, APIGatewayEvent, APIGatewayProxyCallback } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { isNumber } from 'lodash';

export const handler: Handler = async (
  event: APIGatewayEvent,
  _,
  callback: APIGatewayProxyCallback
) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  const tableName = 'matthewmessier.com-experiences';
  const dynamodb = new DynamoDB({ apiVersion: '2012-08-10' });
  let nextPageKey: DynamoDB.Key | undefined;
  try {
    const getPromise = new Promise<Array<Experience>>((resolve, reject) => {
      if (event.pathParameters?.['experienceID']) {
        dynamodb.query(
          {
            TableName: tableName,
            ExpressionAttributeNames: {
              '#uuidName': 'uuid',
              '#startDateName': 'startDate',
            },
            ExpressionAttributeValues: {
              ':uuidValue': {
                S: `matthewmessier.com-experiences`,
              },
              ':startDateValue': {
                S: event.pathParameters?.['experienceID'],
              },
            },
            KeyConditionExpression:
              '#uuidName = :uuidValue AND #startDateName = :startDateValue',
            Limit: 1,
          },
          (error, data) => {
            if (error) {
              reject(error);
            } else {
              if (data.Items?.length) {
                const experience = DynamoDB.Converter.unmarshall(
                  data.Items[0]
                ) as Experience;
                resolve([experience]);
              } else {
                resolve([]);
              }
            }
          }
        );
      } else {
        const base64PageKey = event.queryStringParameters?.['pageKey'];
        let pageKey: DynamoDB.Key | undefined = undefined;
        if (base64PageKey) {
          try {
            pageKey = JSON.parse(
              Buffer.from(base64PageKey, 'base64').toString('utf-8')
            );
          } catch (e) {
            return reject(
              new Error('Could not parse pageKey from query parameters')
            );
          }
        }

        const stringLimit = event.queryStringParameters?.['limit'];
        let numberLimit = 5;
        if (isNumber(stringLimit)) {
          numberLimit = Number(stringLimit);
          if (numberLimit > 20) {
            numberLimit = 20;
          }
        }
        const experiences: Array<Experience> = [];
        dynamodb.query(
          {
            TableName: tableName,
            ExpressionAttributeNames: {
              '#startDateName': 'startDate',
              '#uuidName': 'uuid',
            },
            ExpressionAttributeValues: {
              ':startDateValue': {
                S: new Date().toISOString(),
              },
              ':uuidValue': {
                S: 'matthewmessier.com-experiences',
              },
            },
            KeyConditionExpression:
              '#startDateName <= :startDateValue AND #uuidName = :uuidValue',
            ScanIndexForward: false,
            Limit: numberLimit,
            ExclusiveStartKey: pageKey,
          },
          (error, data) => {
            if (error) {
              reject(error);
            } else {
              data.Items?.forEach(function (item) {
                const experience = DynamoDB.Converter.unmarshall(
                  item
                ) as Experience;
                experiences.push(experience);
              });
              nextPageKey = data.LastEvaluatedKey;
              resolve(experiences);
            }
          }
        );
      }
    });
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
