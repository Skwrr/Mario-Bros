module.exports = {
  name: "volume",
  description: "Establece el volumen",
  use: "(volume)",
  category: 'musica',
  alias: ["volumen", "vol"],
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
      if(isNaN(args[0])) return message.reply("Debes escribir un porcentaje de volumen")
      if(args[0] > 500) return message.reply("El volumen maximo es \`500%\`")
      if(args[0] < 0) return message.reply("Que intentas hacer?")
      if(args[0] == 0) return message.reply("Si quieres silenciar la muica, simplemente mutea al bot, no fastidies a los demás (si quieres parar la musica puedes usar el comandos `"+await prefix+"stop`)")
      client.distube.setVolume(message, parseInt(args[0]))
      message.reply("Volumen establecido al "+args[0]+"%")
    }catch(err){
      message.channel.send(err.message)
    }
  }
}