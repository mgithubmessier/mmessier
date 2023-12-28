import { Experience, ExperienceGetResponse } from '@mmessier/types';
import {
  Handler,
  APIGatewayEvent,
  APIGatewayProxyCallbackV2,
} from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { isNumber, omit } from 'lodash';

const PAGE_LIMIT = 20;

type DynamoExperience = Experience & {
  sortedUniqueId: string; // startDate
  entityName: string; // "experience"
};

export const handler: Handler = async (
  event: APIGatewayEvent,
  _,
  callback: APIGatewayProxyCallbackV2
) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  const tableName = 'matthewmessier.com';
  const dynamodb = new DynamoDB({ apiVersion: '2012-08-10' });
  let nextPageKey: DynamoDB.Key | undefined;
  try {
    const getPromise = new Promise<Array<Experience>>((resolve, reject) => {
      if (event.pathParameters?.['experienceID']) {
        dynamodb.query(
          {
            TableName: tableName,
            ExpressionAttributeNames: {
              '#entityName': 'entityName',
              '#sortedUniqueIdName': 'sortedUniqueId',
            },
            ExpressionAttributeValues: {
              ':entityNameValue': {
                S: `experience`,
              },
              ':sortedUniqueIdValue': {
                S: event.pathParameters?.['experienceID'],
              },
            },
            KeyConditionExpression:
              '#entityName = :entityNameValue AND #sortedUniqueIdName = :sortedUniqueIdValue',
            Limit: 1,
          },
          (error, data) => {
            if (error) {
              reject(error);
            } else {
              if (data.Items?.length) {
                const experience = DynamoDB.Converter.unmarshall(
                  data.Items[0]
                ) as DynamoExperience;
                resolve([
                  {
                    ...omit(experience, ['sortedUniqueId']),
                    startDate: experience.sortedUniqueId,
                  },
                ]);
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
            console.log(`Error: ${JSON.stringify(e, null, 2)}`);
            return reject(
              new Error('Could not parse pageKey from query parameters')
            );
          }
        }

        const stringLimit = event.queryStringParameters?.['limit'];
        let numberLimit = 5;
        if (isNumber(stringLimit)) {
          numberLimit = Number(stringLimit);
          if (numberLimit > PAGE_LIMIT) {
            numberLimit = PAGE_LIMIT;
          }
        }
        const experiences: Array<Experience> = [];
        dynamodb.query(
          {
            TableName: tableName,
            ExpressionAttributeNames: {
              '#sortedUniqueIdName': 'sortedUniqueId',
              '#entityName': 'entityName',
            },
            ExpressionAttributeValues: {
              ':sortedUniqueIdValue': {
                S: new Date().toISOString(),
              },
              ':entityNameValue': {
                S: 'experience',
              },
            },
            KeyConditionExpression:
              '#sortedUniqueIdName <= :sortedUniqueIdValue AND #entityName = :entityNameValue',
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
                ) as DynamoExperience;
                experiences.push({
                  ...omit(experience, ['sortedUniqueId']),
                  startDate: experience.sortedUniqueId,
                });
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
    console.log(`Error: ${JSON.stringify(e, null, 2)}`);
    const error: Error = e as Error;
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    });
  }
};
