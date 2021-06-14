module.exports = async(client, message) => {
  const Discord = require("discord.js")
  client.snipes = new Discord.Collection()
  client.snipes.set("author", message.author.tag)
  client.snipes.set("authorav", message.author.displayAvatarURL({dynamic: true, size: 1024}))
  client.snipes.set("message", message)
}