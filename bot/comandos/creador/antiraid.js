module.exports = {
  name: "antiraid",
  description: "Modulo para detectar usuarios peligrosos en los servidores",
  use: "(add/remove/ban) (userid) (reason)",
  alias: [],
  category: "creador",
  async run(client, message, args){
    const db = require("megadb")
    const dbusers = new db.crearDB("banned")
    if(!process.env.OWNERS_ID.includes(message.author.id)) return message.reply("No puedes ejecutar este comando")
    if(!args[0]) return message.reply("Debes escribir como minimo 1 arg")
    if(args[0] === "add") {
      if(!args[1] || isNaN(args[1])) return message.reply("Debes escribir la id de un usuario")
      if(dbusers.has(args[1])) return message.reply("Ese usuario ya estaba en la lista")
      if(!args[2]) return message.reply("Debes escribir una razón")
      dbusers.set(args[1], args[2])
      message.channel.send("Usuario añadido correctamente a la db")
    }else
    if(args[0] === "remove") {
      if(!args[1] || isNaN(args[1])) return message.reply("Debes escribir la id de un usuario")
      if(!dbusers.has(args[1])) return message.reply("Ese usuario no está en la lista")
      dbusers.delete(args[1])
      message.channel.send("Usuario eliminado correctamente a la db")
    }else
    if(args[0] === "ban"){
      let list = dbusers.size()
      let arr = []
      let arr2 = []
      client.guilds.cache.forEach(guild => {
        guild.members.cache.forEach(async member => {
          if(dbusers.has(member.id)) {
            if(member.bannable){
              member.ban({reason: `${await dbusers.get(member.id)}`})
              if(arr.includes(member.id)) return
              arr.push(member.id)
            }else{
              if(arr2.includes(member.id)) return
              arr2.push(member.id)
            }
          }
        })
      })
      message.channel.send(`${list} usuarios cargados\n${parseInt(arr.length)} usuarios baneados y ${parseInt(arr2.length)} usuarios que no puedo banear`)
    }else{
      message.reply("Argumento no valido")
    }
  }
}