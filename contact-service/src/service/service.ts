import {
  // Contact,
  ContactPostResponse,
} from '@mmessier/types';
import {
  Handler,
  APIGatewayEvent,
  APIGatewayProxyCallbackV2,
} from 'aws-lambda';
// import sendgrid from '@sendgrid/mail';
import { verifyJWTSessionToken } from '@mmessier/service-utilities';

export const handler: Handler = async (
  event: APIGatewayEvent,
  _,
  callback: APIGatewayProxyCallbackV2
) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  try {
    verifyJWTSessionToken(
      event.headers.authentication,
      event.headers['x-forwarded-for'],
      process.env.AUTHENTICATION_JWT_SECRET
    );
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'token valid',
      }),
    });
    // if (event.httpMethod.toUpperCase() === 'POST') {
    //   const contact: Contact = JSON.parse(event.body);

    //   sendgrid.setApiKey(process.env.SENDGRID_SENDER_API_KEY);

    //   await sendgrid.send({
    //     from: process.env.SENDGRID_SINGLE_SENDER_EMAIL,
    //     to: process.env.PERSONAL_EMAIL,
    //     subject: `MATTHEWMESSIER.COM / ${contact.firstName} ${contact.lastName}`,
    //     text: `From Email: ${contact.email}\n\n${contact.message}`,
    //   });

    //   const response: ContactPostResponse = {
    //     contact,
    //     error: null,
    //   };

    //   callback(null, {
    //     statusCode: 200,
    //     body: JSON.stringify(response),
    //   });
    // }
  } catch (e) {
    console.log(`Error: ${JSON.stringify(e, null, 2)}`);
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
