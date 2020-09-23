import { Channel } from './Channel'

export type RedditWatcherTypes = 'post' | 'comment'

/**
 * Separate crieria pairs will be treated as AND statements
 * Criteria in the same Map will be treated as OR statements
 */
export type CriteriaType = 'title' | 'body' | 'parentTitle' | 'parentBody'
export type CriteriaPair = Map<CriteriaType, string[]>
export type Criteria = CriteriaPair[]

export interface WatcherMessage {
  title: string;
  body: string;
}

export interface RedditWatcher {
  type: RedditWatcherTypes
  subreddit: string
  action: 'match'
  criteria: Criteria
  channel: Channel
  message: WatcherMessage
}
