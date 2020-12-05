module.exports = {
  name: 'createcategory',
  description: 'Create a new channel category',
  args: true,
  usage: '<category name>',
  execute (client, message, args) {
    const { channel, guildID, member } = message
    const name = args.join(' ')
    if (member.permissions.has('manageChannels')) {
      client.createChannel(guildID, name, '4')
        .then(() => channel.createMessage(`Created **${name}** category!`))
        .catch(console.error)
    } else channel.createMessage("Sorry, you don't have permission!")
  }
}
