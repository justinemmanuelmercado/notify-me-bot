import { DiscordController } from './interface/DiscordController'
import { Guild, Client, TextChannel, Channel as ChannelInterface } from 'discord.js'
import { Notification } from './interface/Notification'

export class DiscordControllerClass implements DiscordController {
  private _client: Client;
  get client() {
    return this._client
  }

  private _guild: Guild;
  get guild() {
    return this._guild
  }

  constructor(client: Client, guild: Guild) {
    if (client && guild) {
      this._client = client
      this._guild = guild
    } else {
      throw new Error('DiscordController cannot be constructed directly')
    }
  }

  async send(notification: Notification) {
    try {
      const { channel } = notification
      const toChannel = await this.guild.channels.cache.find(chn => chn.name === channel.name)?.fetch()
      if (isTextChannel(toChannel)) {
        await toChannel?.send(notification.body.substring(0, 1999))
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  static async build() {
    try {
      const client = new Client()
      await client.login(process.env.DISCORD_BOT_TOKEN)
      const guild = client.guilds.cache.get(process.env.GUILD_ID || '')
      return new DiscordControllerClass(client, guild!)
    } catch {
      console.error('UNABLE TO CONNECT TO DISCORD')
    }
  }
}

function isTextChannel(x?: ChannelInterface): x is TextChannel {
  return x?.type === 'text'
}
