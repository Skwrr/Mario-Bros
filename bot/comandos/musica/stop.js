module.exports = {
  name: "stop",
  description: "Para todas las canciones",
  use: "",
  category: 'musica',
  alias: [],
  premium: true,
  async run(client, message, args) {
    const serverQueue = client.distube.getQueue(message)
    const Discord = require("discord.js")
    if(!message.member.voice.channel) return message.reply("Debes estar en un canal de voz para ejecutar este comando")
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply("Debes estar en mi mismo canal de voz")
    try{
      if(!serverQueue) return message.reply("No hay canciones")
      client.distube.stop(message)
      message.react("611203741441327117")
    }catch(err){
      message.channel.send(err.message)
    }
  }
}