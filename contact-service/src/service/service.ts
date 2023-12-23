import { Contact, ContactPostResponse } from '@mmessier/types';
import { Handler, APIGatewayEvent, APIGatewayProxyCallback } from 'aws-lambda';
import sendgrid from '@sendgrid/mail';

export const handler: Handler = async (
  event: APIGatewayEvent,
  _,
  callback: APIGatewayProxyCallback
) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  try {
    if (event.httpMethod.toUpperCase() === 'POST') {
      const contact: Contact = JSON.parse(event.body);

      sendgrid.setApiKey(process.env.SENDGRID_SENDER_API_KEY);

      await sendgrid.send({
        from: contact.email,
        to: process.env.PERSONAL_EMAIL,
        subject: `MATTHEWMESSIER.COM / ${contact.firstName} ${contact.lastName}`,
        text: contact.message,
      });

      const response: ContactPostResponse = {
        contact,
        error: null,
      };

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      });
    }
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
