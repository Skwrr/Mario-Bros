module.exports = {
  name: "toprank",
  description: "Observa el top de nivel que tiene la gente",
  use: "",
  category: "niveles",
  alias: ["ranktop", "topr"],
  async run(client, message, args) {
    try {
      const Discord = require("discord.js")
      const db = require("megadb")
      const dinero = new db.crearDB("niveles")
      let sort = await dinero.sort(false, "lvl") 
      let map = sort.map(datos => `**${client.users.resolve(datos.clave).tag}**\n${datos.valor.lvl}lvl | ${datos.valor.xp}xp\n`)
      let embed = new Discord.MessageEmbed()
      .setTitle("Top niveles")
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