module.exports = {
  name: "setconfessions",
  description: "Establece el canal de confesiones",
  use: "",
  category: 'moderacion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const db = require("megadb")
  const confessiondb = new db.crearDB("confessiondb")
  confessiondb.set(message.guild.id, message.channel.id)
  message.channel.send("El canal de confesiones ha sido establecido correctamente")
}
}