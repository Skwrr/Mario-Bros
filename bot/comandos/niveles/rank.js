module.exports = {
  name: "rank",
  description: "Mira cuanto nivel tienes",
  use: "(@user)",
  category: 'niveles',
  alias: ["level"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const db = require("megadb")
  const lvl = new db.crearDB("niveles")
  let prefix = new db.crearDB("prefixes")
  prefix = prefix.get(message.guild.id)
  if(!prefix || prefix === undefined) prefix = new db.crearDB("prefixes").set(message.guild.id, "mb.")

  const usuario = message.mentions.users.first() || message.author;
  const xp = lvl.has(`${usuario.id}.xp`) ? await lvl.get(`${usuario.id}.xp`) : 0
  const level = lvl.has(`${usuario.id}.lvl`) ? await lvl.get(`${usuario.id}.lvl`) : 0


  const rank = new Discord.MessageEmbed()
  .setTitle(`Tarjeta de rango de ${usuario.tag}`)
  .setDescription("Gana xp usando el comando `"+await prefix+"work`")
  .addField('Nivel:', level || 0)
  .addField('XP:', xp || 0)
  .addField('XP necesaria para subir de nivel:', (5 * (level ^ 2) + 75 * level + 100))
  .setColor("RANDOM")
  .setTimestamp()
  .setAuthor(usuario.username, usuario.displayAvatarURL())

  message.channel.send({embeds:[rank]})
}
}