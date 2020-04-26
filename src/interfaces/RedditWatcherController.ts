import { RedditWatcher } from './RedditWatcher'

export interface RedditWatcherController {
  watchers: RedditWatcher[];
  createWatcher: (criteria: string[], type: string) => void;
  runWatchers: () => void;
}
