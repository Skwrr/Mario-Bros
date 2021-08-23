module.exports = async(client, guild) => {
  const db = require("megadb")
  const Discord = require("discord.js")
  let ms = require("@fabricio-191/ms")
  const embed = new Discord.MessageEmbed()
  .setTitle("Servidor Abandonado!")
  .setDescription(guild.name)
  .addField(guild.members.cache.size+" usuarios", "Me uní el <t:"+Math.floor(Number(guild.joinedAt)/1000)+">")
  .setThumbnail(guild.iconURL())
  .setColor("RANDOM")
  client.channels.resolve("877874680739024936").send(embed)
}