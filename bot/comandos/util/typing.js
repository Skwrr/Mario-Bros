module.exports = {
  name: "typing",
  description: "Test",
  use: "",
  category: 'util',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  message.channel.startTyping()
  message.channel.stopTyping(true)
}
}