module.exports = {
  name: "play",
  description: "Reproduce una canción",
  use: "(song)",
  category: 'musica',
  alias: ["p"],
  premium: true,
  async run(client, message, args) {
    const Discord = require("discord.js")
    const song = args.join(" ")
    if(!song) return message.reply("Debes escribir el nombre de una canción")
    if(!message.member.voice.channel) return message.reply("Debes estar en un canal de voz para ejecutar este comando")
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply("Debes estar en mi mismo canal de voz")
    /*message.member.voice.channel.join().catch(err => {
      message.channel.send(err.message)
    })*/
    try{
      client.distube.play(message, song)
    }catch(err){
      message.channel.send(err.message)
    }
  }
}