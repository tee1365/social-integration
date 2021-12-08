// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { FB_GRAPH_URL } from '../../constants';
import { PageAccessTokenResponse, StoryResponse } from '../../types';

// const page_id = '100973542427253'; // getPageId
const igsid = '5266727923343036'; // got from webhook

const getPageAccessToken = async (userToken: string, pageId: string) => {
  console.log(pageId);
  const response = await fetch(
    `https://graph.facebook.com/${pageId}?fields=access_token&access_token=${userToken}`
  );
  const data = (await response.json()) as PageAccessTokenResponse;
  if (!response.ok) {
    throw new Error('App access token failed');
  }
  return data.access_token;
};

const storyMention = async (userToken: string, pageId: string) => {
  const response = await fetch(
    `${FB_GRAPH_URL}/${pageId}/conversations?platform=instagram&user_id=${igsid}&fields=participants&access_token=${userToken}`
  );
  const data = (await response.json()) as StoryResponse;
  if (!response.ok) {
    throw new Error('App access token failed');
  }
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pageAccessToken = await getPageAccessToken(
    req.query.token as string,
    req.query.pageId as string
  );
  const storyMentionResponse = await storyMention(
    pageAccessToken,
    req.query.pageId as string
  );
  res.json(storyMentionResponse.data);
}
