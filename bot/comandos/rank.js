module.exports = async(client, message, args, Discord) => {
  const db = require("megadb")
  const lvl = new db.crearDB("niveles")

  const usuario = message.mentions.users.first() || message.author;
  const xp = await lvl.get(`${usuario.id}.xp`)
  const level = await lvl.get(`${usuario.id}.lvl`)

  const rank = new Discord.RichEmbed()
  .setTitle(`Tarjeta de rango de ${usuario.tag}`)
  .setDescription("Gana xp usando el comando `hpwork`")
  .addField('Nivel:', level)
  .addField('XP:', xp)
  .addField('XP necesaria para subir de nivel:', (5 * (level ^ 2) + 75 * level + 100))
  .setColor("RANDOM")
  .setTimestamp()
  .setAuthor(usuario.username, usuario.avatarURL)

  message.channel.send(rank)
}