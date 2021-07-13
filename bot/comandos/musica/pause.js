module.exports = {
  name: "pause",
  description: "Pausa/reproduce la lista de canciones",
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
      if(serverQueue.pause) {
        message.reply("Queue resumida :+1:")
        return client.distube.resume(message)
      }
      message.reply("Queue pausada :+1:")
      client.distube.pause(message)
    }catch(err){
      message.channel.send(err.message)
    }
  }
}