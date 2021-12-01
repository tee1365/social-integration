export interface CommentResponse {
  id: string;
  mention_comment: MentionedComment;
}

export interface MentionedComment {
  id: string;
  like_count: number;
  text: string;
  timestamp: string;
  media: Media;
}

export interface Media {
  id: string;
  username: string;
}

export interface PageAccessTokenResponse {
  id: string;
  access_token: string;
}

export interface StoryResponse {
  data: StoryMention[];
}

export interface StoryMention {
  id: string;
  participants: StoryParticipants;
}

export interface StoryParticipants {
  data: StoryParticipant[];
}

export interface StoryParticipant {
  id: string;
  username: string;
}

export interface AccountIdResponse {
  id: string;
  instagram_business_account: { id: string };
}

export interface PageIdResponse {
  data: PageIdObj[];
}

export interface PageIdObj {
  access: string;
  name: string;
  id: string;
}

export interface WebhookMention {
  object: 'instagram';
  entry: WebhookCommentMention[] | WebhookStoryMention[];
}

export interface WebhookCommentMention {
  id: string;
  time: number;
  changes: WebhookCommentMentionChanges[];
}

export interface WebhookCommentMentionChanges {
  field: 'mentions';
  value: WebhookCommentMentionChangesValue;
}

export interface WebhookCommentMentionChangesValue {
  comment_id: string;
  media_id: string;
}

export interface WebhookStoryMention {
  id: string;
  time: number;
  messaging: WebhookStoryMentionMessaging[];
}

export interface WebhookStoryMentionMessaging {
  sender: { id: string };
  recipient: { id: string };
  timestamp: number;
  message: WebhookStoryMentionMessage;
}

export interface WebhookStoryMentionMessage {
  mid: string;
  attachments: WebhookStoryMentionAttachment[];
}

export interface WebhookStoryMentionAttachment {
  type: string;
  payload: { url: string };
}
