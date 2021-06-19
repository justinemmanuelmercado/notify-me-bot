import {
  RedditWatcher,
  Criteria,
  CriteriaType
} from '../interface/RedditWatcher'
import { GENERAL_CHANNEL } from './channels'

const fgmCriteria: Criteria = [
  new Map([['title', ['common projects', 'margiela', 'gat', 'achilles']]]),
  new Map([['body', ['common projects', 'margiela', 'gat', 'achilles']]])
]

const forHireCriteria: Criteria = [
  new Map([
    ['title', ['Hiring', 'hiring']],
    [
      'body',
      [
        'react',
        'website',
        'React',
        'typescript',
        'Typescript',
        'node',
        'nodejs',
        'express',
        'vue',
        'frontend',
        'backend'
      ]
    ]
  ])
]

const tg4botsCriteria: Criteria = [
  new Map([
    ['title', ['[criteria]']],
    ['body', ['criteria 2', 'criteria 1']]
  ]),
  new Map([
    ['title', ['if this is in the title']],
    [
      'body',
      ['then this should be in the body', 'or this should be in the body']
    ]
  ])
]

export const redditWatchers: RedditWatcher[] = [
  {
    type: 'post',
    subreddit: 'testingground4bots',
    action: 'match',
    criteria: tg4botsCriteria,
    channel: GENERAL_CHANNEL,
    message: {
      title: 'TESTING',
      body: ''
    }
  },
  {
    type: 'post',
    subreddit: 'frugalmalefashion',
    action: 'match',
    criteria: fgmCriteria,
    channel: GENERAL_CHANNEL,
    message: {
      title: 'FRUGALMALEFASHION',
      body: ''
    }
  },
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
