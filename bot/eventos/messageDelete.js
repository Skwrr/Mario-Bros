module.exports = async(client, message) => {
  const Discord = require("discord.js")
  if(message.author.bot) return
  client.snipes = new Map()
  client.snipes.set(message.channel.id, {
    author: message.author.tag,
    authorav: message.author.displayAvatarURL({dynamic: true, size: 1024}),
    content: message.content
  })
}