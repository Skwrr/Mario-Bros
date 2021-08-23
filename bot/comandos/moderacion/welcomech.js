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
    if(args.length > 0) return message.reply("Este comando no necesita argumentos")
    db.set(message.guild.id, message.channel.id)
    try {
      message.delete()
    }catch(err) {
      message.channel.send(err.message).then(m => m.delete({timeout: 5000}))
    }
    message.reply("Canal establecido correctamente a "+message.guild.channels.resolve(message.channel.id)).then(m => m.delete({timeout: 6000}))
  }
}