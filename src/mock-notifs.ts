import { Notification } from './interfaces/Notification'
import { Channel } from './interfaces/Channel'

const generalChannel: Channel = {
  name: 'general',
  id: process.env.GENERAL_CHANNEL_ID || ''
}

export const mock: Notification[] = [
  {
    id: '1',
    title: 'New stuff here',
    body: '__Here check this stuff__',
    channel: generalChannel
  },
  {
    id: '2',
    title: 'More new stuff here',
    body: 'Check it ooooout',
    channel: generalChannel
  }
]
