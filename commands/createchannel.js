module.exports = {
  name: 'createchannel',
  description: 'Create a new text channel',
  args: true,
  usage: '<channel name>',
  execute (client, message, args) {
    const { channel, guildID, member } = message
    const name = args.join(' ')
    if (member.permissions.has('manageChannels')) {
      client.createChannel(guildID, name, '0')
        .then(() => channel.createMessage(`Created **${name}** channel!`))
        .catch(console.error)
    } else channel.createMessage("Sorry, you don't have permission!")
  }
}
