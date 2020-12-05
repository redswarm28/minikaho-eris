module.exports = client => {
  client.on('ready', () => {
    console.log('Ready!')
    client.editStatus('dnd',
      {
        name: 'your command',
        type: 2
      }
    )
  })
}
