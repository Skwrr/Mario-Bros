module.exports = {
  name: "topbal",
  description: "Observa el top de dinero que tiene la gente",
  use: "",
  category: "economia",
  alias: ["baltop", "top"],
  async run(client, message, args) {
    try {
      const Discord = require("discord.js")
      const db = require("megadb")
      const dinero = new db.crearDB("economy");
      let sort = await dinero.sort(false, "bank");
      let map;
      try{
      map = sort.map(datos => `**${client.users.resolve(datos.clave).tag}**\n${datos.valor.bank}bank | ${datos.valor.cash}cash\n`)
      }catch(error) {
        map = sort.map(datos => `**<@!${datos.clave}>**\n${datos.valor.bank}bank | ${datos.valor.cash}cash\n`)
      }
      let embed = new Discord.MessageEmbed()
      .setTitle("Top economia")
      .setDescription(map.slice(0,10).join("\n"))
      .setColor("RANDOM")
      .setTimestamp()
      .setThumbnail(message.guild.iconURL())
      message.channel.sendEmbed(embed)
    } catch(e) {
    	console.error(e.message)
    }
  }
}