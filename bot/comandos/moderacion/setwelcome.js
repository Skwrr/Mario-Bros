module.exports = {
  name: "setwelcome",
  description: "Establece el comando de bienvenidas",
  use: "(channel/role) (id/mention)",
  category: 'moderacion',
  alias: ["wlc"],
  async run(client, message, args) {
    const Discord = require("discord.js")
    let db = require("megadb")
    db = new db.crearDB("bienvenidas")
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("No tienes permisos para ejecutar este comando");
    if(args[0] == "channel"){
      if(message.guild.channels.resolve(args[1]).type !== "GUILD_TEXT" || message.mentions.channels.first().type !== "GUILD_TEXT") return message.reply("Debes establecer un canal de texto")
      db.set(message.guild.id+".channel", message.mentions.channels.first().id || args[1])
      message.reply("Canal establecido correctamente a "+message.mentions.channels.first() || args[1]).then(m => setTimeout(() => m.delete(), 6000))
      try {
        message.delete()
      }catch(err) {
        message.channel.send(err.message).then(m => setTimeout(() => m.delete(), 5000))
      }
    }
    if(args[0] == "role"){
      let role = message.mentions.roles.first() || (await message.guild.roles.fetch(args[1]))
      if(!role) return message.reply("Debes mencionar un rol o escribir su id")
      db.set(message.guild.id+".role", role.id)
      message.reply("Rol establecido correctamente a <@&"+role.id+">").then(m => setTimeout(() => m.delete(), 6000))
      try {
        message.delete()
      }catch(err) {
        message.channel.send(err.message).then(m => setTimeout(() => m.delete(), 5000))
      }
    }else message.reply("Ese argumento no es válido")
  }
}