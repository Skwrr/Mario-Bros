module.exports = async(client, message, args, Discord) => {
  const db = require("megadb")
  const money = new db.crearDB("economy")
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No tienes permisos para dar dinero")
  let j = message.mentions.users.first()
  if(!j) return message.reply("Mencione a alguien")
  let c = args[1]
  if(!c) return message.reply("Escriba la cantidad de dinero a quitar")
  if(isNaN(c)) return message.reply("Escriba una cantidad de dinero para quitar al jugador")
  if(c <= 0) return message.reply("No puedes quitar 0 de dinero")
  let cb = args[2]
  if(!cb) return message.reply("Escriba donde quiere quitarle el dinero: `cash` o `bank`")
  if(cb == 'cash' || cb == 'bank'){
    if(!money.has(`${j.id}`)) {
      await money.set(`${j.id}.cash`, 0)
      await money.set(`${j.id}.bank`, 0)
    }
    if(c > money.get(`${j.id}.${cb}`)) return message.reply("No puedes quitarle mas dinero del que tiene")
    await money.restar(`${j.id}.${cb}`, c)
    message.channel.send("Has esyablecido correctamente "+c+"$ a "+j+" en "+cb)
  }else{
    message.reply("Escribe `cash` o `bank`, no "+cb)
    return
  }
}