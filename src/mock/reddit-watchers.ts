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

const forHireCriteria: Criteria = [
  new Map([
    ['title' as CriteriaType, ['Hiring', 'hiring']],
    ['body' as CriteriaType, ['react', 'website', 'React', 'typescript', 'Typescript', 'node', 'nodejs', 'express', 'vue', 'frontend', 'backend']]
  ])
]

// const tg4botsCriteria: Criteria = [
//   new Map([
//     ['title' as CriteriaType, ['[criteria]']],
//     ['body' as CriteriaType, ['criteria 2', 'criteria 1']]
//   ]),
//   new Map([
//     ['title' as CriteriaType, ['if this is in the title']],
//     ['body' as CriteriaType, ['then this should be in the body', 'or this should be in the body']]
//   ])
// ]

export const redditWatchers: RedditWatcher[] = [
  {
    type: 'post',
    subreddit: 'forhire',
    action: 'match',
    criteria: forHireCriteria,
    channel: GENERAL_CHANNEL,
    message: {
      title: 'FORHIRE',
      body: ''
    }
  },
  {
    type: 'post',
    subreddit: 'remotejs',
    action: 'match',
    criteria: forHireCriteria,
    channel: GENERAL_CHANNEL,
    message: {
      title: 'REMOTEJS',
      body: ''
    }
  }
]
