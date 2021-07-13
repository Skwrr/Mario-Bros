module.exports = {
  name: "queue",
  description: "Observa la lista de canciones",
  use: "",
  category: 'musica',
  alias: ["q"],
  premium: true,
  async run(client, message, args) {
    const serverQueue = client.distube.getQueue(message)
    const Discord = require("discord.js")
    if(!message.member.voice.channel) return message.reply("Debes estar en un canal de voz para ejecutar este comando")
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply("Debes estar en mi mismo canal de voz")
    try{
      if(!serverQueue) return message.reply("No hay canciones")
      const embed = new Discord.MessageEmbed()
      .setTitle("Queue del servidor")
      .setDescription(`${serverQueue.songs.map((song, id) => `**${id+1}** - ${song.name} \`(${song.formattedDuration})\``).slice(0,10).join('\n')}`)
      .setFooter(message.guild.name)
      .setColor("RANDOM")
      .setTimestamp()
      .setThumbnail(message.guild.iconURL())
      message.channel.send(embed)
    }catch(err){
      message.channel.send(err.message)
    }
  }
}