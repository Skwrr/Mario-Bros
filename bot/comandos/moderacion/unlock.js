module.exports = {
  name: "unlock",
  description: "Haz que todos puedan escribir en este canal",
  use: "",
  category: 'moderacion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("No tienes permisos")
  if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply('No tengo permisos')
  let ch = message.channel
  const everyone = message.guild.roles.cache.find(m => m.name == '@everyone')
  ch.permissionOverwrites.set([
    {
      id: everyone.id,
      allow: ["SEND_MESSAGES"]
    }
  ])
  message.channel.send("Canal revelado 👀").then(m => setTimeout(() => m.delete(), 5000))
}
}