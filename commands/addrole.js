module.exports = {
  name: 'addrole',
  description: 'Add a role to your server',
  args: true,
  usage: '<role name> <role color>',
  execute (client, message, args) {
    const { channel, guildID, member } = message
    if (member.permissions.has('manageRoles')) {
      const name = args[0]
      const color = args[1].replace('#', '')
      let hex = '0x' + color
      if (!args[1]) hex = '0x'
      client.createRole(guildID, { color: parseInt(hex), name: name })
        .then(() => channel.createMessage(`Created role ${name} role!`))
        .catch(console.error)
    } else return channel.createMessage("Sorry, you don't have permission!")
  }
}
