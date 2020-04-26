import { RedditWatcher } from './interfaces/RedditWatcher'
import { RedditWatcherController } from './interfaces/RedditWatcherController'
import { Channel } from './interfaces/Channel'
import { Notification } from './interfaces/Notification'

const GENERAL_CHANNEL: Channel = {
  name: 'general',
  id: process.env.GENERAL_CHANNEL_ID!
}

export class RedditWatcherControllerClass implements RedditWatcherController {
  private _watchers: RedditWatcher[] = [];
  get watchers(): RedditWatcher[] {
    return this._watchers
  };

  public notify: (notif: Notification) => Promise<boolean> = async () => {
    return false
  }

  public runWatchers () {
    this.watchers.forEach((watcher, ind) => {
      watcher.run({ id: ind.toString(), body: 'Random Body', title: 'Random Title' })
    })
  }

  public createWatcher(criteria: string[], type: string) {
    const newWatcher: RedditWatcher = {
      type: <'post' | 'comment'>type,
      stream: '',
      action: 'match',
      criteria,
      run: watchRunner,
      notify: this.notify,
      channel: GENERAL_CHANNEL
    }

    this._watchers.push(newWatcher)
  }
}

function watchRunner({ title, id }: { body: string, title: string, id: string }) {
  // @ts-ignore
  const wtcher: RedditWatcher = this as RedditWatcher
  setInterval(async () => {
    const ran = (Math.random() * 1000).toFixed(0)
    const message = `Watcher #${id} is running and sending you ${ran}`
    const result = await wtcher.notify({ id, body: message, title, channel: wtcher.channel })
    console.log(message)
    if (!result) {
      throw new Error('failed to notify')
    }
  }, 5000)
}
