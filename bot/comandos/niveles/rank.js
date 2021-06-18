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
  if(!prefix || prefix === undefined) prefix = new db.crearDB("prefixes").set(message.guild.id, "hp")

  const usuario = message.mentions.users.first() || message.author;
  const xp = await lvl.get(`${usuario.id}.xp`)
  const level = await lvl.get(`${usuario.id}.lvl`)


  const rank = new Discord.MessageEmbed()
  .setTitle(`Tarjeta de rango de ${usuario.tag}`)
  .setDescription("Gana xp usando el comando `"+prefix+"work`")
  .addField('Nivel:', level)
  .addField('XP:', xp)
  .addField('XP necesaria para subir de nivel:', (5 * (level ^ 2) + 75 * level + 100))
  .setColor("RANDOM")
  .setTimestamp()
  .setAuthor(usuario.username, usuario.displayAvatarURL())

  message.channel.send(rank)
}
}