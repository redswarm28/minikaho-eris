const { readdirSync } = require('fs')
const Eris = require('eris')
const { Collection } = require('eris')
const { token } = require('./config/config.json')
const client = new Eris(token)

client.commands = new Collection() // command handler
const files = readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of files) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

require('./events/ready.js')(client) // Event: ready
require('./events/message.js')(client) // Event: messageCreate

client.connect()
