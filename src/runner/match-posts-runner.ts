import { Notification } from '../interface/Notification'
import { RedditWatcher, CriteriaPair } from '../interface/RedditWatcher'
import { SubmissionStream } from 'snoostorm'
import { Submission } from 'snoowrap'
import { Notifier } from '../reddit-watcher-controller'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)

export function watchMatchPostRunner(stream: SubmissionStream, watcher: RedditWatcher, notify: Notifier) {
  const timeAgo = new TimeAgo('en-US')
  stream.on('item', async (itm: Submission) => {
    let result: boolean = false
    watcher.criteria.some((criterion: CriteriaPair) => {
      if (new RegExp(criterion.get('title')?.join('|') || '').test(itm.title.toLowerCase()) &&
      new RegExp(criterion.get('body')?.join('|') || '').test(itm.selftext.toLowerCase())) {
        result = true
      }
      return result
    })
    if (result) {
      const d = new Date(itm.created_utc * 1000)
      const body = `
      [**${watcher.message.title}**] (${timeAgo.format(d)})
      **${itm.title}**
      ${itm.url}
      ${d.toLocaleString()} 
      --------------------------------------------
      --------------------------------------------
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
