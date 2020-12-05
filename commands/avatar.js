const { prefix } = require('../config/config.json')

module.exports = {
  name: 'avatar',
  description: 'Shows avatar',
  usage: '<mention>',
  execute (client, message, args) {
    const { channel } = message
    const { user } = message.member
    const mention = message.mentions[0]
    const embed = { color: 0xffffff }

    if (mention) {
      const mentionData = client.users.get(mention.id)
      const mentionAvatar = mentionData.dynamicAvatarURL('png', 2048)
      const embedImage = { url: mentionAvatar }
      embed.title = `${mentionData.username}#${mentionData.discriminator}`
      embed.description = `[Avatar URL](${mentionAvatar})`
      embed.image = embedImage
      channel.createMessage({ embed: embed })
    } else if (!args[0]) {
      const userAvatar = user.dynamicAvatarURL('png', 2048)
      const userEmbed = { url: userAvatar }
      embed.title = `${user.username}#${user.discriminator}`
      embed.description = `[Avatar URL](${userAvatar})`
      embed.image = userEmbed
      channel.createMessage({ embed: embed })
    } else message.channel.createMessage(`Proper usage: \`${prefix}${this.name} ${this.usage}\``)
  }
}
