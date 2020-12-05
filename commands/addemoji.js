const fetch = require('node-fetch')
const fs = require('fs')

module.exports = {
  name: 'addemoji',
  description: 'Add an emoji to your server.',
  cooldown: 10,
  args: true,
  usage: '<image url> <emoji name>',
  async execute (client, message, args) {
    const name = args[1]
    const { channel, guildID, member } = message
    if (member.permissions.has('manageEmojis')) {
      async function emoji () {
        const response = await fetch(args[0])
        const buffer = await response.buffer()
        fs.writeFile('./assets/img/emoji.png', buffer, () => {
          client.createGuildEmoji(guildID, {
            name: name,
            image: `data:image/png;base64,${fs.readFileSync('./assets/img/emoji.png', { encoding: 'base64' })}`
          }, 'Reason')
            .then(() => channel.createMessage(`Emoji **${name}** ditambahkan`))
        })
      }
      emoji()
    } else return channel.createMessage('Maaf, kamu tidak punya izin untuk itu.')
  }
}
