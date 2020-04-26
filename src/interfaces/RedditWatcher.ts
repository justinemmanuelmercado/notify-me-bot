import { Channel } from './Channel'
import { Notification } from './Notification'

export interface RedditWatcher {
  type: 'comment' | 'post';
  stream: any;
  action: 'match';
  notify: (notification: Notification) => Promise<boolean>;
  criteria: string[];
  channel: Channel;
  run: (content: RunnerArgs) => void;
}

type RunnerArgs = { body: string, title: string, id: string }
