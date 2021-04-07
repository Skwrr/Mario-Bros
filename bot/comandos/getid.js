module.exports = (client, message, args) => {
  const id = message.channel.id
  message.channel.send(id)
}