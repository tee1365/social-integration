// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { FB_GRAPH_URL } from '../../constants';

type Data = {
  name: string;
};

const commentMention = async (userToken: string) => {
  const response = await fetch(
    `${FB_GRAPH_URL}/17841401344868618?fields=mentioned_comment.comment_id(17931935788847188){timestamp,like_count,text,id,media{id,username}}&access_token=${userToken}`
  );
  const data = (await response.json()) as any;
  console.log(data);
  if (!response.ok) {
    throw new Error('App access token failed');
  }
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await commentMention(req.query.token as string);
  res.json(data);
}
