const { prefix } = require('../config/config.json')

module.exports = {
  name: 'help',
  aliases: ['commands'],
  description: 'Command list',
  cooldown: 5,
  execute (client, message, args) {
    const data = []
    const commands = client.commands

    if (!args.length) {
      const list = commands.map(cmd => cmd.name)
        .filter(cmd => cmd !== 'eval' && cmd !== 'reload')
        .join('`, `')
      data.push(list)

      const embed = {
        color: 0xffffff,
        title: 'Help',
        description: `Command List:\n\`${data}\``,
        footer: { text: `Use ${prefix}help <command name> to get more info` }
      }

      message.channel.createMessage({ embed: embed })
    } else {
      const input = args[0].toLowerCase()
      const command = commands.get(input) || commands.find(c => c.aliases && c.aliases.includes(input))
      if (!command) return message.reply('Wrong command')
      const { aliases, cooldown, description, name, usage } = command

      const embed = { color: 0xffffff, title: `${name} | Help` }
      embed.fields = []

      if (description) {
        const desc = { name: 'Description', value: description }
        embed.fields.push(desc)
      }
      if (aliases) {
        const alias = { name: 'Aliases', value: aliases.join(',') }
        embed.fields.push(alias)
      }
      if (usage) {
        const use = { name: 'Usage', value: `${prefix}${name} ${usage}` }
        embed.fields.push(use)
      }
      const cd = { name: 'Cooldowns', value: `${cooldown || 3} seconds` }
      embed.fields.push(cd)

      message.channel.createMessage({ embed: embed })
    }
  }
}
