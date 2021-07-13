module.exports = async(client, guild) => {
  const db = require("megadb")
  const dbusers = new db.crearDB("banned")
  const Discord = require("discord.js")
  let arr = []
  guild.members.cache.forEach(member => {
    if(dbusers.has(member.id)) {
      arr.push(user)
    }
  })
  const embed = new Discord.MessageEmbed()
  .setTitle("Nuevo Servidor!")
  .setDescription(guild.name)
  .addField("Usuarios peligrosos", arr.length)
  .setThumbnail(guild.iconURL())
  .setColor("RANDOM")
  client.channels.cache.get("631536178486706176").send(embed)
}