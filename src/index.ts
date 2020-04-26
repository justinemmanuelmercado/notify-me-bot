import dotenv from 'dotenv'
import { DiscordControllerClass } from './discord-controller'
import { RedditWatcherControllerClass } from './reddit-watcher-controller'

import { Notification } from './interfaces/Notification'
dotenv.config()

async function main() {
  const discordController = await DiscordControllerClass.build()
  const redditController = new RedditWatcherControllerClass()

  if (!discordController || !redditController) {
    console.error('Controller can\'t be established')
    return
  }

  redditController.notify = async (notification: Notification) => {
    try {
      await discordController.send(notification)
      return true
    } catch {
      throw new Error('Failed sending message')
    }
  }

  redditController.createWatcher([], 'post')
  redditController.createWatcher([], 'post')
  redditController.createWatcher([], 'post')
  redditController.createWatcher([], 'post')
  redditController.createWatcher([], 'post')

  redditController.runWatchers()
}
(() => {
  main()
})()
