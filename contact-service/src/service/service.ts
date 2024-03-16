import { Contact, ContactPostResponse } from '@mmessier/types';
import {
  Handler,
  APIGatewayEvent,
  APIGatewayProxyCallbackV2,
} from 'aws-lambda';

import {
  DynamoDBClient,
  PutItemCommand,
  PutItemOutput,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

import { add } from 'date-fns';
import sendgrid from '@sendgrid/mail';
import { omit } from 'lodash';

type DynamoContact = Contact & {
  sortedUniqueId: string; // ipAddress
  entityName: string; // "contact"
};

const putContact = async (
  event: APIGatewayEvent,
  contact: Contact
): Promise<PutItemOutput> => {
  const client = new DynamoDBClient({ apiVersion: '2012-08-10' });

  const command = new PutItemCommand({
    TableName: 'matthewmessier.com',
    Item: {
      entityName: {
        S: 'contact',
      },
      sortedUniqueId: {
        S: event.headers['X-Forwarded-For'],
      },
      TTL: {
        N: `${Math.floor(add(new Date(), { minutes: 60 }).getTime() / 1000)}`,
      },
      email: {
        S: contact.email,
      },
      firstName: {
        S: contact.firstName,
      },
      lastName: {
        S: contact.lastName,
      },
      message: {
        S: contact.message,
      },
    },
  });

  return client.send(command);
};

const getContact = async (event: APIGatewayEvent): Promise<Array<Contact>> => {
  const client = new DynamoDBClient({ apiVersion: '2012-08-10' });

  const command = new QueryCommand({
    TableName: 'matthewmessier.com',
    ExpressionAttributeNames: {
      '#sortedUniqueIdName': 'sortedUniqueId',
      '#entityName': 'entityName',
    },
    ExpressionAttributeValues: {
      ':sortedUniqueIdValue': {
        S: event.headers['X-Forwarded-For'],
      },
      ':entityNameValue': {
        S: 'contact',
      },
    },
    KeyConditionExpression:
      '#sortedUniqueIdName = :sortedUniqueIdValue AND #entityName = :entityNameValue',
    Limit: 1,
  });

  const data = await client.send(command);

  if (data.Items.length) {
    const contact = unmarshall(data.Items[0]) as DynamoContact;
    return [omit(contact, ['sortedUniqueId', 'entityName'])];
  }
  return [];
};

export const handler: Handler = async (
  event: APIGatewayEvent,
  _,
  callback: APIGatewayProxyCallbackV2
) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  try {
    if (event.httpMethod.toUpperCase() === 'POST') {
      const contact: Contact = JSON.parse(event.body);
      if (contact.message?.length > 200) {
        contact.message = contact.message.slice(0, 200);
      }

      sendgrid.setApiKey(process.env.SENDGRID_SENDER_API_KEY);

      await sendgrid.send({
        from: process.env.SENDGRID_SINGLE_SENDER_EMAIL,
        to: process.env.PERSONAL_EMAIL,
        subject: `MATTHEWMESSIER.COM / ${contact.firstName} ${contact.lastName}`,
        text: `From Email: ${contact.email}\n\n${contact.message}`,
      });

      const existingContact = await getContact(event);
      if (!existingContact.length) {
        await putContact(event, contact);
      }

      const response: ContactPostResponse = {
        contact,
        error: null,
      };

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      });
    } else if (event.httpMethod.toUpperCase() === 'GET') {
      const contact = await getContact(event);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          contacts: contact,
        }),
      });
    }
  } catch (e) {
    console.error(`Error: ${JSON.stringify(e, null, 2)}`);
    const error: Error = e as Error;
    const response: ContactPostResponse = {
      error: error.message,
    };
    callback(null, {
      statusCode: 500,
      body: JSON.stringify(response),
    });
  }
};
