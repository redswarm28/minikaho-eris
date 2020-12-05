module.exports = {
  name: 'reload',
  description: 'Reloads a command',
  args: true,
  execute (client, message, args) {
    const commandName = args[0].toLowerCase()
    const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName))

    if (!command) return message.channel.createMessage(`There is no command with name or alias \`${commandName}\`, ${message.author.mention}!`)

    delete require.cache[require.resolve(`./${command.name}.js`)]

    try {
      const newCommand = require(`./${command.name}.js`)
      client.commands.set(newCommand.name, newCommand)
    } catch (error) {
      console.error(error)
      message.channel.createMessage(`There was an error while reloading a command \`${command.name}\`: \`${error.message}\``)
    }

    message.channel.createMessage(`Command \`${command.name}\` was reloaded.`)
  }
}
