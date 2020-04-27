import { RedditWatcher } from '../interface/RedditWatcher'
import { GENERAL_CHANNEL } from './channels'

export const redditWatchers: RedditWatcher[] = [
  {
    type: 'post',
    subreddit: 'testingground4bots',
    action: 'match',
    criteria: ['avocado', 'tomato'],
    channel: GENERAL_CHANNEL
  },
  {
    type: 'comment',
    subreddit: 'testingground4bots',
    action: 'match',
    criteria: ['banana', 'laptop'],
    channel: GENERAL_CHANNEL
  },
  {
    type: 'comment',
    subreddit: 'testingground4bots',
    action: 'match',
    criteria: ['papaya', 'melon'],
    channel: GENERAL_CHANNEL
  }
]
