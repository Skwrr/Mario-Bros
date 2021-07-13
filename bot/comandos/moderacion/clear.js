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
  let c = args[0]
  if(!c || isNaN(c) || c < 1) return message.reply("Escriba el numero de mensajes a borrar")
  .then(m => {
    m.delete({timeout: 4000})
  })
    c= parseInt(c)
    c=c+1
  message.channel.send(`${parseInt(c)-1} mensajes eliminados`)
  .then(m => {
message.channel.bulkDelete(c).catch(err => {
    return message.edit("Ha ocurrido un error. \n\n"+err)
    .then(me => {
      me.delete({timeout: 10000})
    })
    return true
  })
m.delete({timeout: 4000})
  })
  }
}