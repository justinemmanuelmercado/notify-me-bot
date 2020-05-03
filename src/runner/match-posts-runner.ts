import { Notification } from '../interface/Notification'
import { RedditWatcher, CriteriaPair } from '../interface/RedditWatcher'
import { SubmissionStream } from 'snoostorm'
import { Submission } from 'snoowrap'
import { Notifier } from '../reddit-watcher-controller'

export function watchMatchPostRunner(stream: SubmissionStream, watcher: RedditWatcher, notify: Notifier) {
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
      **${watcher.message.title}**
      [${itm.title}](${itm.url})
      \`\`\`
      ${itm.selftext}
      \`\`\`
      ${d.toLocaleString()}
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
