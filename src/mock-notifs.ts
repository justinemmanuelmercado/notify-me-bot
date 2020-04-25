import { Notification } from './interfaces/Notification'
import { Channel } from './interfaces/Channel';

const generalChannel: Channel = {
  name: 'general',
  id: '513923285898100767'
}

export const mock: Notification[] = [
  {
    id: '1',
    title: 'New stuff here',
    body: 'Here check this stuff',
    channel: generalChannel
  },
  {
    id: '2',
    title: 'More new stuff here',
    body: 'Check it ooooout',
    channel: generalChannel
  }
]
