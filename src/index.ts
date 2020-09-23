import dotenv from 'dotenv'
import { DiscordControllerClass } from './discord-controller'
import { RedditWatcherControllerClass } from './reddit-watcher-controller'
import { redditWatchers } from './mock/reddit-watchers'

import { Notification } from './interface/Notification'
dotenv.config()

async function main() {
  const discordController = await DiscordControllerClass.build()
  if (!discordController) throw new Error('unable to connect to discord')
  const notifier = async (notification: Notification) => {
    try {
      await discordController.send(notification)
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  const redditController = new RedditWatcherControllerClass(notifier)
  if (!redditController) throw new Error('unable to connect to reddit')

  for (const watcher of redditWatchers) {
    redditController.createWatcher(watcher)
  }
  console.log('Running app')
  redditController.runWatchers()
}
(() => {
  try {
    main()
  } catch (e) {
    console.log(e)
  }
})()
