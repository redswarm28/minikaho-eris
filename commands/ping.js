module.exports = {
  name: 'ping',
  description: 'Check bot ping.',
  execute (client, message, args) {
    const latency = Math.round(Date.now() - message.timestamp)
    message.channel.createMessage({
      embed: {
        color: 0xffffff,
        title: 'Ping',
        description: `:ping_pong: Pong! \`${latency}ms\``
      }
    })
  }
}
