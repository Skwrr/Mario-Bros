module.exports = {
  name: "nuke",
  description: "Borra los mensajes de todo el canal",
  use: "",
  category: 'moderacion',
  alias: ["clearchannel"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("No tienes permiso para `nukear` un canal")
  if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply("No tengo permisos para gestionar canales")
  message.reply("Seguro que quieres nukear este canal?").then(async m => {
    await m.react("✅")
    await m.react("❌")
    let filter = (reaction, user) => {
      if(user.id !== message.author.id) return
      if(reaction.emoji.name === "❌"){
        message.channel.send("Solicitud cancelada").then(a => setTimeout(() => a.delete(),5000))
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
    }
    m.awaitReactions({filter, max: 1, time: 20000, errors: ['time']}).catch(error => m.edit("Se ha acabado el tiempo!"))
  })
}
}