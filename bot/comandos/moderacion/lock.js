module.exports = async(client, message, args, Discord) => {
  const ms = require("ms")
  let tiempo = args[0];
  if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("No tienes permisos")
  let ch = message.channel
  if(!args[0]) message.channel.send("No has establecido el tiempo, supongo que quieres que sea permanente.").then(m => m.delete({timeout: 5000}))
  const everyone = message.guild.roles.cache.find(m => m.name == '@everyone')
  ch.overwritePermissions([
    {
      id: everyone.id,
      deny: ["SEND_MESSAGES"]
    }
  ])
  message.channel.send("Canal escondido 😎").then(m => m.delete({timeout: 5000}))
  if(args[0]){
    if(ms(tiempo) > 1209600000 || ms(tiempo) < 10000) return message.reply("No puedes poner un valor de mas de 2 semanas o menos de 10 segundos")
    if(isNaN(args[0][0])) return message.reply("Ese número no es valido")
    setTimeout(() => {
      ch.overwritePermissions([
        {
          id: everyone.id,
          allow: ["SEND_MESSAGES"]
        }
      ])
      message.channel.send("Canal revelado 👀").then(m => m.delete({timeout: 5000}))
    }, ms(args[0]))
  }
}