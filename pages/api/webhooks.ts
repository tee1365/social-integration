// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import request from 'request';

// Handles messages events
const handleMessage = (sender_psid: string, received_message: any) => {
  let response;

  // Check if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an image!`,
    };
  } else if (received_message.attachments) {
    // Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: 'Is this the right picture?',
              subtitle: 'Tap a button to answer.',
              image_url: attachment_url,
              buttons: [
                {
                  type: 'postback',
                  title: 'Yes!',
                  payload: 'yes',
                },
                {
                  type: 'postback',
                  title: 'No!',
                  payload: 'no',
                },
              ],
            },
          ],
        },
      },
    };

    // Sends the response message
    callSendAPI(sender_psid, response);
  }
};
// Handles messaging_postbacks events
function handlePostback(sender_psid: string, received_postback: any) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { text: 'Thanks!' };
  } else if (payload === 'no') {
    response = { text: 'Oops, try sending another image.' };
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid: string, response: any) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };
  request(
    {
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log('message sent!');
      } else {
        console.error('Unable to send message:' + err);
      }
    }
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Check if a token and mode were sent
    if (mode && token) {
      // Check the mode and token sent are correct
      if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        // Respond with 200 OK and challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.status(403);
      }
    }
  } else if (req.method === 'POST') {
    let body = req.body;

    console.log(body);

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {
      if (body.entry[0].messaging) {
        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function (entry: any) {
          // Get the webhook event. entry.messaging is an array, but
          // will only ever contain one event, so we get index 0
          let webhook_event = entry.messaging[0];
          console.log(webhook_event);

          // Get the sender PSID
          let sender_psid = webhook_event.sender.id;
          console.log('Sender PSID: ' + sender_psid);

          if (webhook_event.message) {
            handleMessage(sender_psid, webhook_event.message);
          } else if (webhook_event.postback) {
            handlePostback(sender_psid, webhook_event.postback);
          }
        });
      } else if (body.entry[0].changes) {
        console.log(body.entry[0].changes[0]);
        if (body.entry[0].changes[0].field === 'mention') {
          body.entry.forEach(function (entry: any) {
            let webhook_event = body.entry[0].changes[0];
            console.log(webhook_event);
          });
        }
      }

      // Return a '200 OK' response to all events
      res.status(200).send('EVENT_RECEIVED');
    } else if (body.object === 'instagram') {
      if (body.entry[0].changes) {
        console.log(body.entry[0].changes);
        if (body.entry[0].changes[0].field === 'mentions') {
          body.entry.forEach(function (entry: any) {
            // Get the webhook event. entry.messaging is an array, but
            // will only ever contain one event, so we get index 0
            let webhook_event = body.entry[0].changes[0];
            console.log(webhook_event);
          });
        }
      } else if (body.entry[0].messaging) {
        console.log(body.entry[0].messaging[0]);
      }
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      res.status(404);
    }
  }
}
