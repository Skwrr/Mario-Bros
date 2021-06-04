module.exports = async(client, message, args, Discord) => {
  if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("No tienes permisos")
  let ch = message.channel
  const everyone = message.guild.roles.cache.find(m => m.name == '@everyone')
  ch.overwritePermissions([
    {
      id: everyone.id,
      allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
    }
  ])
  message.channel.send("Canal revelado 👀")
}