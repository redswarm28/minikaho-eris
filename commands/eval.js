module.exports = {
  name: 'eval',
  aliases: ['e'],
  description: 'Evaluates your code',
  args: true,
  usage: '<code>',
  async execute (client, message, args) {
    const input = args.join(' ')
    const { channel, member } = message
    const { guild, id } = member
    if (id === guild.ownerID) { // change guild.ownerID with your user ID
      try {
        let result
        if (input.includes('client.token')) result = 'Hmm, no no no'
        else result = await eval(input)

        channel.createMessage({
          embed: {
            color: 0xffffff,
            fields: [
              {
                name: 'Input',
                value: `\`\`\`js\n${input}\`\`\``
              },
              {
                name: 'Output',
                value: `\`\`\`js\n${result}\`\`\``
              }
            ]
          }
        })
      } catch (error) {
        channel.createMessage({
          embed: {
            color: 0xffffff,
            fields: [
              {
                name: 'Input',
                value: `\`\`\`js\n${input}\`\`\``
              },
              {
                name: 'Output',
                value: `\`\`\`js\n${error}\`\`\``
              }
            ]
          }
        })
      }
    } else {
      console.log("Doesn't work")
    }
  }
}
