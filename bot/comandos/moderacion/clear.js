const db = require("megadb")
module.exports = {
  name: "clear",
  description: "Borra mensajes",
  use: "(ammount)",
  category: 'moderacion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
    let u = process.env.OWNERS_ID
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("No tienes permisos")
    if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply("No tengo permisos")
  let c = args[0]
  if(!c || isNaN(c) || c < 1) return message.reply("Escriba el numero de mensajes a borrar")
  .then(m => {
    m.delete({timeout: 4000})
  })
    c= parseInt(c)
    c=c+1
    if(c > 100) return message.reply("No puedes borrar mas de 100 mensajes")
    function infiniteClear(num, boolean){
      if(num > 100){
        while(num > 100){
          message.channel.bulkDelete(num, boolean || false).catch(err => {
            return message.channel.send(err.message)
          })
          num-100
        }
      }else message.channel.bulkDelete(num, boolean || false).catch(err => {
        return message.channel.send(err.message)
      })
    }
    message.channel.bulkDelete(c, true).catch(err => {
        return message.channel.send(err.message)
      })
  message.channel.send(`${parseInt(c)-1} mensajes eliminados`)
    .then(me => {
me.delete({timeout: 4000})
  })
  
  }
}