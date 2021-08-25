module.exports = {
  name: "lock",
  description: "Mutea el canal en el que te encuentras",
  use: "(time)",
  category: 'moderacion',
  alias: ["lockchannel"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const ms = require("@fabricio-191/ms")
  let tiempo = args[0];
  if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("No tienes permisos")
  if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply("No tengo permisos para gestionar canales")
  let ch = message.channel
  if(!args[0]) message.channel.send("No has establecido el tiempo, supongo que quieres que sea permanente.").then(m => setTimeout(() => m.delete(), 5000))
  const everyone = message.guild.roles.cache.find(m => m.name == '@everyone')
  ch.permissionOverwrites.set([
    {
      id: everyone.id,
      deny: ["SEND_MESSAGES"]
    }
  ])
  message.channel.send("Canal escondido 😎").then(m => setTimeout(() => m.delete(), 5000))
  if(args[0]){
    if(ms(tiempo) > 1209600000 || ms(tiempo) < 10000) return message.reply("No puedes poner un valor de mas de 2 semanas o menos de 10 segundos")
    if(isNaN(args[0][0])) return message.reply("Ese número no es valido")
    setTimeout(() => {
      ch.permissionOverwrites.set([
        {
          id: everyone.id,
          allow: ["SEND_MESSAGES"]
        }
      ])
      message.channel.send("Canal revelado 👀").then(m => setTimeout(() => m.delete(), 5000))
    }, ms(args[0]))
  }
}
}