module.exports = async(client, message, args, Discord) => {
  const db = require("megadb")
  const lvl = new db.crearDB("niveles")

  const usuario = message.mentions.users.first() || message.author;
  const xp = await lvl.get(`${usuario.id}.xp`)
  const level = await lvl.get(`${usuario.id}.lvl`)
  
  var rn = "5";
  if(level >= "5") {
    rn = "10";
    
  }else if(level >= "10") {
    rn = "20";
    
  }else if(level >= "20") {
    rn = "50";
  }else if(level >= "50") {
    rn = "100";
  }else if(level >= "100") {
    rn = "Has llegado al maximo";
  }

  const rank = new Discord.RichEmbed()
  .setTitle(`Tarjeta de rango de ${usuario.tag}`)
  .setDescription("Gana xp usando el comando `hpwork`")
  .addField('Nivel:', level)
  .addField('XP:', xp)
  .addField('XP necesaria para subir de nivel:', (5 * (level ^ 2) + 75 * level + 100))
  .addField('Consigue un rango al llegar al nivel:', rn)
  .setColor("RANDOM")
  .setTimestamp()
  .setAuthor(usuario.username, usuario.avatarURL)

  message.channel.send(rank)
}