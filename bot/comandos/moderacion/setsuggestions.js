const db = require("megadb")
const suggest = new db.crearDB("suggestionchannel")
module.exports = {
  name: "setsuggestions",
  description: "Establece el canal de sugerencias",
  use: "",
  category: 'moderacion',
  alias: [],
  async run(client, message, args) {
    if(args.length >= 1) return message.reply("Este comando no necesita argumentos")
    const Discord = require("discord.js")
    if(message.channel.type !== "GUILD_TEXT") return message.reply("Debes establecer un canal de texto")
  suggest.establecer(message.guild.id, message.channel.id).then(()=> {
    message.channel.send("Canal de sugerencias estalecido, aca se mandaran todas las sugerencias").catch(e => {
      message.edit(e)
    })
  })
}
}