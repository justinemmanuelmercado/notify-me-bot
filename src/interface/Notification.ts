import { Channel } from './Channel'

export interface Notification {
  id: String;
  title: String;
  body: String;
  channel: Channel;
}
