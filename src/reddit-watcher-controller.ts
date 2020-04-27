import { RedditWatcher } from './interface/RedditWatcher'
import { RedditWatcherController } from './interface/RedditWatcherController'
import { Notification } from './interface/Notification'
import Snoowrap, { Submission, Comment } from 'snoowrap'
import { CommentStream, SubmissionStream } from 'snoostorm'

type Notifier = (notif: Notification) => Promise<boolean>

export class RedditWatcherControllerClass implements RedditWatcherController {
  constructor(notifier: Notifier) {
    const {
      REDDIT_BOT_USER_AGENT,
      REDDIT_BOT_SECRET,
      REDDIT_BOT_ID,
      REDDIT_BOT_PASSWORD,
      REDDIT_BOT_USERNAME
    } = process.env

    this.client = new Snoowrap({
      userAgent: REDDIT_BOT_USER_AGENT || 'MY NOTIFICATION APP',
      clientId: REDDIT_BOT_ID,
      clientSecret: REDDIT_BOT_SECRET,
      username: REDDIT_BOT_USERNAME,
      password: REDDIT_BOT_PASSWORD
    })

    this.notify = notifier
  }

  private streams: Array<SubmissionStream | CommentStream> = []
  private client: Snoowrap
  private notify: Notifier
  private _watchers: RedditWatcher[] = [];
  get watchers(): RedditWatcher[] {
    return this._watchers
  };

  public runWatchers() {
    for (const watcher of this.watchers) {
      if (watcher.type === 'post') {
        const postStream = new SubmissionStream(this.client, { subreddit: watcher.subreddit, limit: 10, pollTime: 3000 })
        watchMatchPostRunner(postStream, watcher, this.notify)
        this.streams.push(postStream)
      } else {
        const commentStream = new CommentStream(this.client, { subreddit: watcher.subreddit, limit: 10, pollTime: 3000 })
        watchMatchCommentRunner(commentStream, watcher, this.notify)
        this.streams.push(commentStream)
      }
    }
  }

  public createWatcher(watcher: RedditWatcher) {
    this._watchers.push(watcher)
  }
}

function watchMatchCommentRunner(stream: CommentStream, watcher: RedditWatcher, notify: Notifier) {
  stream.on('item', async (itm: Comment) => {
    if (new RegExp(watcher.criteria.join('|')).test(itm.body.toLowerCase())) {
      const d = new Date(itm.created_utc * 1000)
      const body = `
        COMMENT
        url: ${itm.permalink}
        selftext: ${itm.body}
        date_posted: ${d.toLocaleString()}
        criteria: ${watcher.criteria.join(' | ')}
        `
      const notif: Notification = {
        body,
        id: itm.id,
        channel: watcher.channel,
        title: 'New Comment'
      }
      await notify(notif)
      console.log(body)
    }
  })
}

function watchMatchPostRunner(stream: SubmissionStream, watcher: RedditWatcher, notify: Notifier) {
  stream.on('item', async (itm: Submission) => {
    if (new RegExp(watcher.criteria.join('|')).test(itm.selftext.toLowerCase()) || new RegExp(watcher.criteria.join('|')).test(itm.title.toLowerCase())) {
      const d = new Date(itm.created_utc * 1000)
      const body = `
      SUBMISSION
      title: ${itm.title}
      url: ${itm.permalink}
      selftext: ${itm.selftext}
      date_posted: ${d.toLocaleString()}
      criteria: ${watcher.criteria.join(' | ')}
    `
      const notif: Notification = {
        body,
        id: itm.id,
        channel: watcher.channel,
        title: itm.title
      }
      await notify(notif)
      console.log(body)
    }
  })
}
