// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { APP_ID, APP_SECRET, FB_GRAPH_URL } from '../../constants';

type Data = {
  name: string;
};

type TokenResponse = {
  access_token: string;
};

const getAppToken = async () => {
  const response = await fetch(
    `https://graph.facebook.com/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&grant_type=client_credentials`
  );
  const data = (await response.json()) as TokenResponse;
  if (!response.ok) {
    throw new Error('App access token failed');
  }
  return data.access_token;
};

const getLongLivedUserAccessToken = async () => {
  const response = await fetch(
    `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=EAAF7reetv20BAAecZAZC6mtivv8C78yUhOsAivBONEBAF8rQjk0V3MdZA65HJMEhupCt6p8qSVy1jmKTU9RcrymzA79b9JPaYKib1BqWwFfVULxYWbaXx3swQQYcCDjQwvhttq4RBhQPofpDeNEZBlKlQjxY98As5sBtLfmJq2UfZAuZBhuQ40TpcYljmBcmTHO2GBIZAySWBgjl7ZBNRZCOZBeuD2XSKFQbuIxZAqbMBdB0Rtutxt734lB`
  );
  const data = (await response.json()) as TokenResponse;
  console.log(data);
  // if (!response.ok) {
  //   throw new Error('App access token failed');
  // }
  return data.access_token;
};

const getPageAccessToken = async (userToken: string) => {
  const response = await fetch(
    `https://graph.facebook.com/100973542427253?fields=access_token&access_token=${userToken}`
  );
  const data = (await response.json()) as any;
  console.log(data);
  if (!response.ok) {
    throw new Error('App access token failed');
  }
  return data.access_token;
};

const debugToken = async (appToken: string, token: string) => {
  const response = await fetch(
    `${FB_GRAPH_URL}/debug_token?input_token=${token}&access_token=${appToken}`
  );
  const data = (await response.json()) as any;
  return data.data.scopes;
};

const me = async (userToken: string) => {
  const response = await fetch(
    `${FB_GRAPH_URL}/me?fields=id,name&access_token=${userToken}`
  );
  const data = (await response.json()) as any;
  if (!response.ok) {
    throw new Error('App access token failed');
  }
  return data;
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

const storyMention = async (userToken: string) => {
  const response = await fetch(
    `${FB_GRAPH_URL}/100973542427253/conversations?platform=instagram&user_id=5266727923343036&fields=participants&access_token=${userToken}`
  );
  const data = (await response.json()) as any;
  console.log(response);
  // if (!response.ok) {
  //   throw new Error('App access token failed');
  // }
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const appAccessToken = await getAppToken();
  // const pageAccessToken = await getPageAccessToken(req.query.token as string);
  // // console.log(appAccessToken, req.query.token as string);
  // // const user = await me(req.query.token as string);
  // // res.json(user);
  // const testRes = await storyMention(pageAccessToken);
  // console.log(testRes.data[0].participants);
  // const scopes = await debugToken(appAccessToken, req.query.token as string);
  // res.json({ scopes } as any);
  // console.log(await getLongLivedUserAccessToken());
}
