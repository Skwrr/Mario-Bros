module.exports = {
  name: "topbal",
  description: "Observa el top de gente con dinero",
  use: "",
  category: "economia",
  alias: ["baltop", "top"],
  async run(client, message, args) {
    try {
      const Discord = require("discord.js")
      const db = require("megadb")
      const dinero = new db.crearDB("economy")
      let sort = await dinero.sort(false, "bank")
      let embed = new Discord.MessageEmbed().setTitle("Top Economia")
        let map = sort.map(datos => `**${client.users.cache.find(e => e.id === datos.clave).tag}**: \nBanco: ${datos.valor.bank} | Bolsillo: ${datos.valor.cash}\n`)
        embed
        .setDescription(map.slice(0,10))
        .setColor("RANDOM")
        .setTimestamp()
        .setThumbnail(message.guild.iconURL()) 
      message.channel.send(embed)
    }catch (err){
      return message.reply("Ha ocurrido un error")
    }
  }
}