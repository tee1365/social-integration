// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { FB_GRAPH_URL } from '../../constants';
import { AccountIdResponse } from '../../types';

const getAccountId = async (userToken: string, pageId: string) => {
  const response = await fetch(
    `${FB_GRAPH_URL}/${pageId}?fields=instagram_business_account&access_token=${userToken}`
  );
  const data = (await response.json()) as AccountIdResponse;
  if (!response.ok) {
    throw new Error('App access token failed');
  }
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getAccountId(
    req.query.token as string,
    req.query.pageId as string
  );
  res.json(data);
}
