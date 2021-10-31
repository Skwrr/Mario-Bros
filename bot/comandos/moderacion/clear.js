const db = require("megadb")
module.exports = {
  name: "clear",
  description: "Borra mensajes",
  use: "(ammount)",
  category: 'moderacion',
  perms: {
    user: ["MANAGE_MESSAGES"],
    bot: ["MANAGE_MESSAGES"]
  },
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  let c = args[0]
  if(!c || isNaN(c) || c < 1) return message.reply("Escriba el numero de mensajes a borrar")
  .then(m => {
    setTimeout(() => m.delete(),4000)
  })
    c= parseInt(c)
    c=c+1

    function infiniteClear(num, boolean){
      return new Promise((r,e) => {
        if(num >= 100){
          message.channel.bulkDelete(100, boolean || false).catch(message.reply)
          num-=100
          infiniteClear(num, boolean).then(r).catch(console.err)
        } else {
          message.channel.bulkDelete(num, boolean || false).catch(message.reply)
          r()
        }
      })
    }
    infiniteClear(c, true).then(() => {
  message.channel.send(`${parseInt(c)-1} mensajes eliminados`)
    .then(me => {
setTimeout(() => me.delete(),4000)
    })
  })
  
  }
}