module.exports = {
  name: "topbal",
  description: "Observa el top de gente con dinero",
  use: "",
  category: "economia",
  alias: ["baltop", "top"],
  async run(client, message, args) {
    const Discord = require("discord.js")
    const db = require("megadb")
    const dinero = new db.crearDB("economy")
    let map = dinero.map(false, (dinero, u) => `<@${u}>: ${dinero.bank}$`)
    map = dinero.sort(false, "bank")
    for(let clave in map){
      for(let valor of clave){
        console.log(clave, valor)
      }
    }
    let embed = new Discord.MessageEmbed()
    .setDescription(`<@${clave}>: ${valor}`)
    .setColor("RANDOM")
    .setTimestamp()
    .setThumbnail(message.guild.iconURL())
    message.channel.send(embed)
  }
}