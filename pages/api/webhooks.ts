// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('received');
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
    console.log('received!!!');
    if (body.object === 'instagram') {
      if (body.entry[0].changes) {
        if (body.entry[0].changes[0].field === 'mentions') {
          body.entry.forEach((entry: any) => {
            // Get the webhook event. entry.messaging is an array, but
            // will only ever contain one event, so we get index 0
            let webhook_event = body.entry[0].changes[0];
            console.log(webhook_event);
            res.status(200);
            res.json(webhook_event);
          });
        }
      } else if (body.entry[0].messaging) {
        console.log(body.entry[0].messaging[0]);
        res.status(200);
        res.json(body.entry[0].messaging[0]);
      }
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      res.status(404);
    }
  }
}
