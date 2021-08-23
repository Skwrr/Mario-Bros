module.exports = {
  name: "loop",
  description: "Observa que musica estás escuchando",
  use: "[all]",
  category: 'musica',
  alias: ["repeat", "l"],
  premium: true,
  async run(client, message, args) {
    const db = require("megadb")
    let prefix = new db.crearDB("prefixes").get(message.guild.id)
    if (prefix == null || prefix == undefined) prefix = "mb."
    const serverQueue = client.distube.getQueue(message)
    const Discord = require("discord.js")
    if(!message.member.voice.channel) return message.reply("Debes estar en un canal de voz para ejecutar este comando")
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply("Debes estar en mi mismo canal de voz")
    try{
      if(!serverQueue) return message.reply("No hay canciones")
      if(args[0] && args[0] === "all"){
        if(client.distube.getQueue(message).repeatMode === 0){
          client.distube.setRepeatMode(message, 2)
          message.reply(`Se ha establecido el modo de reproduccion a **toda la queue**`)
        }else
        if(client.distube.getQueue(message).repeatMode === 1 || serverQueue.repeatMode === 2){
          client.distube.setRepeatMode(message, 0)
          message.reply(`Se ha eliminado el modo de repetición`)
        }
      }else if(!args[0]){
        if(client.distube.getQueue(message).repeatMode === 0){
          client.distube.setRepeatMode(message, 1)
          message.reply(`Se ha establecido el modo de reproduccion a **la canción actual**`)
        }else
        if(client.distube.getQueue(message).repeatMode === 2 || serverQueue.repeatMode === 1){
          client.distube.setRepeatMode(message, 0)
          message.reply(`Se ha eliminado el modo de repetición`)
        }
      }else{
        message.reply("Ese argumento no es valido")
      }
    }catch(err){
      message.channel.send(err.message)
    }
  }
}