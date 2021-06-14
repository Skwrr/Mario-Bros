const db = require("megadb")
const blacklist = new db.crearDB("blacklistglobal")
let user
module.exports = {
  name: "blacklist",
  description: "Entra a mi servidor de soporte",
  use: "(bl/wl) (user) [reason]",
  category: 'creador',
  alias: ["bl"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const staff = process.env.OWNERS_ID
  if (!staff.includes(message.author.id)) return message.channel.send("❌ **Solo mi Creador puede usar Este cmd** ❌")
  if(!args[0] || args[0] !== "wl" && args[0] !== "bl") return message.reply("Debes poner un comando valido; `wl` `bl`")
  if(args[0] === "bl"){
    user = args[1]
    if(!user) return message.reply("Debes de poner una id")
    let reason = args.slice(2).join(" ")
    if(!reason || reason === "") reason = "No reason specified"
    if(blacklist.has(user)) return message.reply("Ese usuario está actualmente en la lista negra.\nRazon: "+blacklist.get(user))
    blacklist.set(user, reason)
    message.channel.send("Ese usuario ya está en la lista negra")
  }else if(args[0] === "wl"){
    user = args[1]
    if(!user) return message.reply("Debes de poner una id")
    if(!blacklist.has(user)) return message.reply("Ese usuario no está en la lista negra")
    blacklist.eliminar(user)
    message.channel.send("Ese usuario ya ha sido puesto en la lista blanca")
  }


  }
}