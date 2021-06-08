module.exports = async(client, message, args, Discord) => {
  const db = require("megadb")
  const dinero = new db.crearDB("economy")
  let map = await dinero.sort((a, b) => b.cash - a.cash).map(false, (dinero, u) => `<@!${u}>: ${dinero.cash}`)
  

  let embed = new Discord.MessageEmbed()
  .setDescription(map)
  .setColor("RANDOM")
  .setTimestamp()
  .setThumbnail(message.guild.iconURL())
  message.channel.send(embed)
}