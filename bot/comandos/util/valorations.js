let Discord = require("discord.js")
module.exports = {
  name: "valorations",
  description: "Observa el promedio de valoración del bot (5% de probabilidad de obtener el mensaje de valoracion)",
  use: "",
  category: "util",
  alias: [],
  async run(client, message, args){
    let valorationdb = require("megadb")
    valorationdb = new valorationdb.crearDB("valoration")
    let media = Number(await valorationdb.get("total.valoration")) / Number(await valorationdb.get("total.times"))
    let medias
    if(media > 0 && media <= 0.5) medias = "<:estrella:879095495421730837>\nPenoso"
    else if(media > 0.5 && media <= 1) medias = "<:estrella:879095495904092200>\nMuy malo"
    else if(media > 1 && media <= 1.5) medias = "<:estrella:879095495904092200><:estrella:879095495421730837>\nMalo"
    else if(media > 1.5 && media <= 2) medias = "<:estrella:879095495904092200><:estrella:879095495904092200>\nAceptable"
    else if(media > 2 && media <= 2.5) medias = "<:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495421730837>\nBueno"
    else if(media > 2.5 && media <= 3) medias = "<:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200>\nMuy bueno"
    else if(media > 3 && media <= 3.5) medias = "<:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495421730837>\nBuenisimo"
    else if(media > 3.5 && media <= 4) medias = "<:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200>\nExcelente"
    else if(media > 4 && media <= 4.5) medias = "<:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495421730837>\nLo mejor"
    else if(media > 4.5 && media <= 5) medias = "<:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200>\nPerfecto"
    let embed = new Discord.MessageEmbed()
    .setTitle("Valoración promedio del bot")
    .setDescription(medias)
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RANDOM")
    message.channel.send({embeds: [embed]})
  },
  SlashCommand: {
    async run(client, message, args){
      let valorationdb = require("megadb")
      valorationdb = new valorationdb.crearDB("valoration")
      let media = Number(await valorationdb.get("total.valoration")) / Number(await valorationdb.get("total.times"))
      let medias
      if(media > 0 && media <= 0.5) medias = "<:estrella:879095495421730837>\nPenoso"
      else if(media > 0.5 && media <= 1) medias = "<:estrella:879095495904092200>\nMuy malo"
      else if(media > 1 && media <= 1.5) medias = "<:estrella:879095495904092200><:estrella:879095495421730837>\nMalo"
      else if(media > 1.5 && media <= 2) medias = "<:estrella:879095495904092200><:estrella:879095495904092200>\nAceptable"
      else if(media > 2 && media <= 2.5) medias = "<:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495421730837>\nBueno"
      else if(media > 2.5 && media <= 3) medias = "<:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200>\nMuy bueno"
      else if(media > 3 && media <= 3.5) medias = "<:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495421730837>\nBuenisimo"
      else if(media > 3.5 && media <= 4) medias = "<:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200>\nExcelente"
      else if(media > 4 && media <= 4.5) medias = "<:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495421730837>\nLo mejor"
      else if(media > 4.5 && media <= 5) medias = "<:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200><:estrella:879095495904092200>\nPerfecto"
      let embed = new Discord.MessageEmbed()
      .setTitle("Valoración promedio del bot")
      .setDescription(medias)
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("RANDOM")
      message.reply({embeds: [embed]})
    }
  }
}