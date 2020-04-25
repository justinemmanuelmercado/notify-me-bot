import { Notification } from './Notification'
import { Channel } from './Channel'
import { Guild, Client } from 'discord.js'
import { DiscordController as DiscordControllerClass } from '../discord-controller'

export interface DiscordController {
  send: (notification: Notification, channel: Channel) => Promise<void>
}
