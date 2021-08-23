module.exports = async(client, guild) => {
  const mmdb = require('manage-maliciousdb');
  const Discord = require("discord.js")
  let arr = []
  guild.members.cache.forEach(async member => {
    const isMalicious = await mmdb.findElementByID(member);

    if (isMalicious) {
      arr.push(guild.members.resolve(isMalicious.id).tag)
      guild.channels.random().send(`Usuario Malicioso:\nID: ${isMalicious.id}\nReason: ${isMalicious.razon}\nProof: ${isMalicious.prueba}`);
    }
  })
  const embed = new Discord.MessageEmbed()
  .setTitle("Nuevo Servidor!")
  .setDescription(guild.name)
  .addField("Usuarios peligrosos", arr.length)
  .setThumbnail(guild.iconURL())
  .setColor("RANDOM")
  client.channels.cache.get("877874680739024936").send(embed)
}