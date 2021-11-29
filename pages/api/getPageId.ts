// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { FB_GRAPH_URL } from '../../constants';

type Data = {
  name: string;
};

const getPageId = async (userToken: string) => {
  const response = await fetch(
    `${FB_GRAPH_URL}/me/accounts?access_token=${userToken}`
  );
  const data = (await response.json()) as any;
  if (!response.ok) {
    throw new Error('App access token failed');
  }
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await getPageId(req.query.token as string);
  res.json(data);
}
