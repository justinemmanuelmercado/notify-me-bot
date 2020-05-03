import { Channel } from './Channel'

export type RedditWatcherTypes = 'post' | 'comment'
export interface RedditWatcher {
  type: RedditWatcherTypes
  subreddit: string
  action: 'match'
  criteria: Criteria
  channel: Channel
  message: WatcherMessage
}

/**
 * Separate crieria pairs will be treated as AND statements
 * Criteria in the same Map will be treated as OR statements
 */
export type Criteria = CriteriaPair[]
export type CriteriaPair = Map<CriteriaType, string[]>
export type CriteriaType = 'title' | 'body' | 'parentTitle' | 'parentBody'

export interface WatcherMessage {
  title: string;
  body: string;
}
