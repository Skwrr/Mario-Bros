module.exports = {
  name: "nowplaying",
  description: "Observa que musica estás escuchando",
  use: "[--s]",
  category: 'musica',
  alias: ["np"],
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
      if(args[0] && args[0] === "--save" || args[0] === "--s"){
        message.reply(`Si en algún otro momento quieres reproducir esta canción, usa este codigo => **${serverQueue.songs[0].id}**`)
      }else if(!args[0]){
        message.channel.send('Actualmente, está sonando la canción **'+serverQueue.songs[0].name+'**')
      }else{
        message.reply("Ese argumento no es valido")
      }
    }catch(err){
      message.channel.send(err.message)
    }
  }
}