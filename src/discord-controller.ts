import { DiscordController } from './interfaces/DiscordController'
import { Guild, Client, GuildChannel, TextChannel } from 'discord.js'
import { Notification } from './interfaces/Notification'
import { Channel } from './interfaces/Channel'

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
        await toChannel?.send(notification.body)
      }
    } catch {
      throw new Error('Can\'t send message')
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

function isTextChannel(x?: GuildChannel): x is TextChannel {
  return x?.type === 'text'
}
