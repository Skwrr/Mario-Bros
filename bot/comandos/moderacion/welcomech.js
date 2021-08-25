module.exports = {
  name: "welcomech",
  description: "Establece el comando de bienvenidas",
  use: "",
  category: 'moderacion',
  alias: ["wlcch"],
  async run(client, message, args) {
    const Discord = require("discord.js")
    let db = require("megadb")
    db = new db.crearDB("bienvenidas")
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("No tienes permisos para ejecutar este comando")
    if(message.guild.channels.resolve(args[0]).type !== "GUILD_TEXT" || message.mentions.channels.first().type !== "GUILD_TEXT") return message.reply("Debes establecer un canal de texto")
    db.set(message.guild.id, message.mentions.channels.first().id || args[0])
    try {
      message.delete()
    }catch(err) {
      message.channel.send(err.message).then(m => setTimeout(() => m.delete(), 5000))
    }
    message.reply("Canal establecido correctamente a "+message.mentions.channels.first() || args[0]).then(m => setTimeout(() => m.delete(), 6000))
  }
}