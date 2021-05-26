module.exports = async(client, message, args, Discord) => {
  let rol = message.guild.roles.cache.find(x => x.name === "Giveaway")
  if(!rol) return message.reply("No se ha encontrado un rol con el nombre `Giveaway`, contacta con algun moderador o si eres uno, añade el rol `Giveaway`")
  if(!message.member.roles.cache.has(rol.id)) return message.reply("No tienes el rol `Giveaway`")
  const ms = require("ms")
  const prize = args.slice(1).join(" ");
  let tiempo = args[0]

  if(!tiempo) return message.reply("Escribe en cuanto tiempo desea acabar este evento")
  tiempo = ms(ms(tiempo), { long: true })
  if(!prize) return message.reply("Escribe que deseas sortear")
  if(ms(tiempo)>1209600000||ms(tiempo)<10000) return message.reply("No puedes crear un sorteo de mas de 2 semanas o menos de 10 segundos")

  let embed = new Discord.MessageEmbed()
  .setTitle(`**${prize}**`)
  .setDescription(`Reacciona con 🎉 para participar\nHosteado por: <@${message.author.id}>`)
  .setFooter("Termina")
  .setTimestamp(Date.now() + ms(args[0]))
  .setColor("RED")
  
  message.channel.send(embed).then(async m => {
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        return message.channel.send(
          `No reaccionó suficiente gente para el sorteo!`
        );
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      message.channel.send(
        `Ganador de **${prize}** es...\n ${winner} Felicidades!!🥳🥳 `
      );
    }, ms(args[0]));
    })

}