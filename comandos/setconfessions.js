module.exports = async(client, message, args, Discord) => {
  const db = require("megadb")
  const confessiondb = new db.crearDB("confessiondb")
  confessiondb.set(message.guild.id, message.channel.id)
  message.channel.send("El canal de confesiones ha sido establecido correctamente")
}