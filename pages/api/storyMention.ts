// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { FB_GRAPH_URL } from '../../constants';

type Data = {
  name: string;
};

const page_id = '100973542427253'; // where did I get this?
const igsid = '5266727923343036'; // got from webhook

const getPageAccessToken = async (userToken: string) => {
  const response = await fetch(
    `https://graph.facebook.com/${page_id}?fields=access_token&access_token=${userToken}`
  );
  const data = (await response.json()) as any;
  console.log(data);
  // if (!response.ok) {
  //   throw new Error('App access token failed');
  // }
  return data.access_token;
};

const storyMention = async (userToken: string) => {
  const response = await fetch(
    `${FB_GRAPH_URL}/${page_id}/conversations?platform=instagram&user_id=${igsid}&fields=participants&access_token=${userToken}`
  );
  const data = (await response.json()) as any;
  console.log(data);
  // if (!response.ok) {
  //   throw new Error('App access token failed');
  // }
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const pageAccessToken = await getPageAccessToken(req.query.token as string);
  const testRes = await storyMention(pageAccessToken);
  res.json(testRes.data);
}
