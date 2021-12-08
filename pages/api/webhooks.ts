// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { WebhookMention } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        res.status(403);
      }
    }
  } else if (req.method === 'POST') {
    let body: WebhookMention = req.body;
    console.log(body);
    if (body.object === 'instagram') {
      if ('changes' in body.entry[0]) {
        let webhook_event = body.entry[0].changes[0];
        console.log(webhook_event);
        res.status(200);
      } else if ('messaging' in body.entry[0]) {
        console.log(body.entry[0].messaging[0]);
        res.status(200);
      } else {
        res.status(404);
      }
    } else if (body.object === 'page') {
      if ('changes' in body.entry[0]) {
        console.log(body.entry[0].changes[0]);
        res.status(200);
      } else if ('messaging' in body.entry[0]) {
        console.log(body.entry[0].messaging[0]);
        res.status(200);
      } else {
        res.status(404);
      }
    } else {
      res.status(404);
    }
  }
}
