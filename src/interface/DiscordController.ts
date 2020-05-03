import { Notification } from './Notification'
import { Channel } from './Channel'
export interface DiscordController {
  send: (notification: Notification, channel: Channel) => Promise<void>
}
