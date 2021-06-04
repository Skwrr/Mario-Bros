module.exports = (client, message, args) => {
  message.channel.startTyping()
  message.channel.stopTyping(true)
}