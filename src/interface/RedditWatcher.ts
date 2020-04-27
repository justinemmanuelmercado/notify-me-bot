import { Channel } from './Channel'

export type RedditWatcherTypes = 'post' | 'comment' | 'both';
export interface RedditWatcher {
  type: RedditWatcherTypes;
  subreddit: string;
  action: 'match';
  criteria: string[];
  channel: Channel;
}
