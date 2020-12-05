const { prefix } = require('../config/config.json')
const { Collection } = require('eris')

module.exports = client => {
  client.on('messageCreate', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName))
    if (!command) return
    if (!message.content.startsWith(prefix) || message.author.bot) return
    if (message.channel.type === 'dm') return
    if (!client.commands.has(commandName)) return

    /*
     * Required arguments and Expected command usage
     * [args: true] and [usage: <args1> <args2>]
     */
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author.mention}!`
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
      }
      return message.channel.createMessage(reply)
    }

    /*
     * Cooldowns (amount)
     * cooldown: 5
     */
    const cooldowns = new Collection()
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 3) * 1000

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000
        return message.channel.createMessage(`Please wait ${timeLeft.toFixed(0)} more second(s) before reusing the \`${command.name}\` command.`)
      }
    }

    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

    try { // Run the commands
      command.execute(client, message, args)
    } catch (error) {
      console.log(error)
      message.channel.createMessage('There was an error trying to execute that command!')
    }
  })
}
