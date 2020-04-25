import dotenv from 'dotenv'
import { DiscordController } from './discord-controller'
import { mock } from './mock-notifs'
dotenv.config()

async function main() {
  const dc = await DiscordController.build()
  if (!dc) {
    return
  }
  for (const mockNotif in mock) {
    const el = mock[mockNotif]
    await dc.send(el)
  }
}
(async () => {
  await main()
})()
