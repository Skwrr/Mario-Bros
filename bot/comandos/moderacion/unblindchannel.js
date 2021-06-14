module.exports = {
  name: "unblindchannel",
  description: "Muestra el canal a todos los usuarios",
  use: "",
  category: 'moderacion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("No tienes permisos")
  let ch = message.channel
  const everyone = message.guild.roles.cache.find(m => m.name == '@everyone')
  ch.overwritePermissions([
    {
      id: everyone.id,
      allow: ["VIEW_CHANNEL"]
    }
  ])
  message.channel.send("Canal revelado 👀").then(m => m.delete({timeout: 5000}))
}
}