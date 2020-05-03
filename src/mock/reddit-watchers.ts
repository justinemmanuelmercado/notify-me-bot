import { RedditWatcher, Criteria, CriteriaType } from '../interface/RedditWatcher'
import { GENERAL_CHANNEL } from './channels'

const fgmCriteria: Criteria = [
  new Map([
    ['title' as CriteriaType, ['red wing']]
  ]),
  new Map([
    ['title' as CriteriaType, ['viberg']]
  ]),
  new Map([
    ['body' as CriteriaType, ['red wing']]
  ]),
  new Map([
    ['body' as CriteriaType, ['viberg']]
  ])
]

const tg4botsCriteria: Criteria = [
  new Map([
    ['title' as CriteriaType, ['this must be in the title']]
  ]),
  new Map([
    ['title' as CriteriaType, ['if this is in the title']],
    ['body' as CriteriaType, ['then this should be in the body', 'or this should be in the body']]
  ])
]

export const redditWatchers: RedditWatcher[] = [
  {
    type: 'post',
    subreddit: 'frugalmalefashion',
    action: 'match',
    criteria: fgmCriteria,
    channel: GENERAL_CHANNEL,
    message: {
      title: 'Found some boots in /r/frugalmalefashion',
      body: 'Check it out, this is just a test by the way'
    }
  },
  {
    type: 'post',
    subreddit: 'testingground4bots',
    action: 'match',
    criteria: tg4botsCriteria,
    channel: GENERAL_CHANNEL,
    message: {
      title: 'Found some tests in /r/testingground4bots',
      body: 'Check it out, this is just a test by the way'
    }
  }
]
