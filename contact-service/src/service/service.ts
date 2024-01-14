import { Contact, ContactPostResponse } from '@mmessier/types';
import {
  Handler,
  APIGatewayEvent,
  APIGatewayProxyCallbackV2,
} from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { add } from 'date-fns';
import sendgrid from '@sendgrid/mail';
import {
  PutItemInput,
  PutItemInputAttributeMap,
} from 'aws-sdk/clients/dynamodb';
import { omit } from 'lodash';

type DynamoContact = Contact & {
  sortedUniqueId: string; // ipAddress
  entityName: string; // "contact"
};

const putContact = async (
  event: APIGatewayEvent,
  contact: Contact
): Promise<DynamoDB.PutItemOutput> => {
  const dynamodb = new DynamoDB({ apiVersion: '2012-08-10' });

  return new Promise((resolve, reject) => {
    const item: PutItemInputAttributeMap = {
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
    };
    const input: PutItemInput = {
      TableName: 'matthewmessier.com',
      Item: item,
    };
    dynamodb.putItem(input, (error, data) => {
      if (error) {
        console.log(`DynamoError: ${JSON.stringify(error, null, 2)}`);
        return reject('Failed to insert contact into dynamodb');
      }
      return resolve(data);
    });
  });
};

const getContact = async (event: APIGatewayEvent): Promise<Array<Contact>> => {
  const dynamodb = new DynamoDB({ apiVersion: '2012-08-10' });

  return new Promise((resolve, reject) => {
    dynamodb.query(
      {
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
      },
      (error, data) => {
        if (error) {
          reject(error);
        } else if (!data.Items.length) {
          resolve([]);
        } else {
          const contact = DynamoDB.Converter.unmarshall(
            data.Items[0]
          ) as DynamoContact;
          resolve([omit(contact, ['sortedUniqueId', 'entityName'])]);
        }
      }
    );
  });
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
