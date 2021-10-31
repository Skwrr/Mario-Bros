module.exports = {
  name: "give-money",
  description: "Dale dinero a un usuario",
  use: "(@user) (ammount) (cash/bank)",
  category: 'economia',
  perms: {
    owner: process.env.OWNERS_ID
  },
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const db = require("megadb")
  const money = new db.crearDB("economy")
  let j = message.mentions.users.first()
  if(!j) return message.reply("Mencione a alguien")
  let c = args[1]
  if(!c) return message.reply("Escriba la cantidad de dinero a dar")
  if(isNaN(c)) return message.reply("Escriba una cantidad de dinero para dar al jugador")
  if(c <= 0) return message.reply("No puedes dar 0 de dinero")
  let cb = args[2]
  if(!cb) return message.reply("Escriba donde quiere darle el dinero: `cash` o `bank`")
  if(cb == 'cash' || cb == 'bank'){
    if(!money.has(`${j.id}`)) {
      await money.set(`${j.id}.cash`, 0)
      await money.set(`${j.id}.bank`, 0)
    }
    await money.sumar(`${j.id}.${cb}`, c)
    message.channel.send("Has añadido correctamente "+c+"$ a "+j+" en "+cb)
  }else{
    message.reply("Escribe `cash` o `bank`, no \""+cb+"\"")
    return
  }
}
}