import { Experience, ExperienceGetResponse } from '@mmessier/types';
import {
  Handler,
  APIGatewayEvent,
  APIGatewayProxyCallbackV2,
} from 'aws-lambda';
import {
  AttributeValue,
  DynamoDBClient,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { isEmpty, isNumber, omit } from 'lodash';

const PAGE_LIMIT = 20;

type DynamoExperience = Experience & {
  sortedUniqueId: string; // startDate
  entityName: string; // "experience"
};

const getExperiences = async (
  event: APIGatewayEvent
): Promise<ExperienceGetResponse> => {
  const tableName = 'matthewmessier.com';
  const client = new DynamoDBClient({ apiVersion: '2012-08-10' });

  console.log('EVENT!', JSON.stringify(event, null, 2));
  if (!isEmpty(event.pathParameters?.['experienceID'])) {
    const command = new QueryCommand({
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
    });
    const data = await client.send(command);
    console.log('experience data 1', JSON.stringify(data.Items, null, 2));
    if (data.Items.length) {
      const experience = unmarshall(data.Items[0]) as DynamoExperience;
      return {
        experiences: [
          {
            ...omit(experience, ['sortedUniqueId']),
            startDate: experience.sortedUniqueId,
          },
        ],
        next_page_key: null,
      };
    } else {
      return {
        experiences: [],
        next_page_key: null,
      };
    }
  } else {
    const base64PageKey = event.queryStringParameters?.['pageKey'];
    let pageKey: Record<string, AttributeValue> | undefined = undefined;
    if (base64PageKey) {
      try {
        pageKey = JSON.parse(
          Buffer.from(base64PageKey, 'base64').toString('utf-8')
        );
      } catch (e) {
        console.error(`Error: ${JSON.stringify(e, null, 2)}`);
        throw new Error('Could not parse pageKey from query parameters');
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
    const command = new QueryCommand({
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
    });
    const data = await client.send(command);
    const experiences = data.Items?.map((item): Experience => {
      const experience = unmarshall(item) as DynamoExperience;

      return {
        ...omit(experience, ['sortedUniqueId']),
        startDate: experience.sortedUniqueId,
      };
    });
    return {
      experiences,
      next_page_key: data.LastEvaluatedKey
        ? JSON.stringify(unmarshall(data.LastEvaluatedKey))
        : null,
    };
  }
};

export const handler: Handler = async (
  event: APIGatewayEvent,
  _,
  callback: APIGatewayProxyCallbackV2
) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  try {
    const response = await getExperiences(event);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
    });
  } catch (e) {
    console.error(`Error: ${JSON.stringify(e, null, 2)}`, e);
    const error: Error = e as Error;
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    });
  }
};
