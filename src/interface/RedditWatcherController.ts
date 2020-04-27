import { RedditWatcher, RedditWatcherTypes } from './RedditWatcher'

export interface RedditWatcherController {
  watchers: RedditWatcher[];
  createWatcher: (watcher: RedditWatcher) => void;
  runWatchers: () => void;
}
