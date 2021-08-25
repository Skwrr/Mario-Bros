module.exports = {
  name: "remove",
  description: "Elimina una canción de la queue",
  use: "(index)",
  category: 'musica',
  alias: [],
  premium: true,
  async run(client, message, args) {
    const serverQueue = client.distube.getQueue(message)
    const Discord = require("discord.js")
    if(!message.member.voice.channel) return message.reply("Debes estar en un canal de voz para ejecutar este comando")
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply("Debes estar en mi mismo canal de voz")
    try{
      const song = args[0]
      if(!args[0] ||isNaN(args[0])) return message.reply("Debes escribir el numero de la posición en la queue de una canción")
      if(!serverQueue) return message.reply("No hay canciones")
      if(!serverQueue.songs[parseInt(song)-1]) return message.reply("No existe esa canción")
      const embed = new Discord.MessageEmbed()
      .setTitle("Canción removida")
      .setDescription(`${serverQueue.songs[parseInt(song)-1].name}`)
      .setFooter(message.guild.name)
      .setColor("RANDOM")
      .setTimestamp()
      .setThumbnail(message.guild.iconURL())
      delete serverQueue.songs[parseInt(song)-1]
      const embed2 = new Discord.MessageEmbed()
      .setTitle("Queue actual del servidor")
      .setDescription(`${serverQueue.songs.map((song, id) => `**${id+1}** - ${song.name} \`(${song.formattedDuration})\``).slice(0,10).join('\n')}`)
      .setFooter(message.guild.name)
      .setColor("RANDOM")
      .setTimestamp()
      .setThumbnail(message.guild.iconURL())
      message.channel.send({embeds: [embed, embed2]})
    }catch(err){
      message.channel.send(err.message)
    }
  }
}