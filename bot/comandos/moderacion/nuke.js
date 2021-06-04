module.exports = async(client, message, args, Discord) => {
  if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("No tienes permiso para `nukear` un canal")
  message.reply("Seguro que quieres nukear este canal?").then(async m => {
    await m.react("✅")
    await m.react("❌")
    m.awaitReactions((reaction, user) => {
      if(user.id !== message.author.id) return
      if(reaction.emoji.name === "❌"){
        message.channel.send("Solicitud cancelada").then(a => a.delete({timeout: 5000}))
        m.delete()
        return
      }else if(reaction.emoji.name === "✅"){
        message.channel.clone().then(x => {
          x.setPosition(message.channel.position)
          message.channel.delete()
          x.send(`${message.author.tag} ha nukeado el canal ${x}`)
        })
      }else{
        return
      }
    })
  })
}