module.exports = {
  name: "blindchannel",
  description: "Oculta el canal a todos los usuarios",
  use: "(time)",
  category: 'moderacion',
  alias: ["blind"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const ms = require("@fabricio-191/ms")
  let tiempo = args[0];
  if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("No tienes permisos")
  if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply("No tiengo permisos")
  let ch = message.channel
  if(!args[0]) message.channel.send("No has establecido el tiempo, supongo que quieres que sea permanente.")
  const everyone = message.guild.roles.cache.find(m => m.name == '@everyone')
  ch.overwritePermissions([
    {
      id: everyone.id,
      deny: ["VIEW_CHANNEL"]
    }
  ])
  message.channel.send("Canal escondido 😎")
  if(args[0]){
    if(ms(tiempo) > 1209600000 || ms(tiempo) < 10000) return message.reply("No puedes poner un valor de mas de 2 semanas o menos de 10 segundos")
    if(isNaN(args[0][0])) return message.reply("Ese número no es valido")
    setTimeout(() => {
      ch.overwritePermissions([
        {
          id: everyone.id,
          allow: ["VIEW_CHANNEL"]
        }
      ])
      message.channel.send("Canal revelado 👀")
    }, ms(args[0]))
  }
}
}