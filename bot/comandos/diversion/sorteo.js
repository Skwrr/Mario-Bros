module.exports = {
  name: "sorteo",
  description: "Haz un sorteo",
  use: "(time) (giveaway)",
  category: 'diversion',
  alias: ["giveaway", "g"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const time = require('sleep')
  let rol = message.guild.roles.cache.find(x => x.name === "Giveaway")
  if(!rol) return message.reply("No se ha encontrado un rol con el nombre `Giveaway`, contacta con algun moderador o si eres uno, añade el rol `Giveaway`")
  if(!message.member.roles.cache.has(rol.id)) return message.reply("No tienes el rol `Giveaway`")
  const ms = require("ms")
  const prize = args.slice(1).join(" ");
  let tiempo = args[0]
  
  if(!tiempo || tiempo === null || tiempo === undefined || isNaN(tiempo[0])) return message.reply("Escribe en cuanto tiempo desea acabar este evento")
  tiempo = ms(ms(tiempo))
  if(!prize) return message.reply("Escribe que deseas sortear")
  if(ms(tiempo) > 1209600000 || ms(tiempo) < 10000) return message.reply("No puedes crear un sorteo de mas de 2 semanas o menos de 10 segundos")

  let embed = new Discord.MessageEmbed()
  .setTitle(`**${prize}**`)
  .setDescription(`Reacciona con 🎉 para participar\nTiempo restante: ${tiempo}\nHosteado por: <@${message.author.id}>`)
  .setFooter("Termina")
  .setTimestamp(Date.now() + ms(args[0]))
  .setColor("RED")
  
  message.channel.send(embed).then(async m => {
    await m.react("🎉");
    const interval = setInterval(() => {
      tiempo = ms(tiempo)-7500
      tiempo = ms(tiempo)
      embed = embed.setDescription(`Reacciona con 🎉 para participar\nTiempo restante: ${tiempo}\nHosteado por: <@${message.author.id}>`)
      m.edit(embed)
      if(ms(tiempo) <= 0) {
        if (m.reactions.cache.get("🎉").count <= 1) {
          message.channel.send(
          `No reaccionó suficiente gente para el sorteo!`
          );
          return clearInterval(interval)
        }
        let winner = m.reactions.cache
          .get("🎉")
          .users.cache.filter((u) => !u.bot)
          .random();
        message.channel.send(
        `Ganador de **${prize}** es...\n ${winner} Felicidades!!🥳🥳 `
        );
        let embed2 = embed.setDescription(`Sorteo terminado, ganador: ${winner}\nHosteado por: <@${message.author.id}>\n\nQuieres ReRoll? Reacciona a "✔"`)
        m.edit(embed2).then(async g => {
          await g.react("✔")
          g.awaitReactions((reaction, user) => {
            if(reaction.emoji.name === "✔"){
              if(user.bot) return
              reaction.users.remove(user.id)
              if(!message.guild.members.resolve(user.id).roles.cache.has(rol.id)) {
                let a = message.reply("No tienes permiso para hacer un ReRoll")
                a.delete({timeout: 2500})
                return
                }
              message.channel.send(`Otro ganador de **${prize}** es...\n ${winner} Felicidades!!🥳🥳`)
            }
          })
        })
        return clearInterval(interval)
      }
    }, 7500)
  })

}
}