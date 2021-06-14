module.exports = async(guild) => {
  const db = require("megadb")
  const fs = require("fs")
  const prefixes = new db.crearDB("prefixes")
  if(!prefixes.has(guild.id)) prefixes.set(guild.id, 'hp')

  let defaultChannel = "";
  guild.channels.cache.forEach((channel) => {
    if(channel.type == "text" && defaultChannel == "") {
      if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  })
  defaultChannel.send("Hola, no me gusta hacer esto, pero solo quería agradecerte que me agregaras a tu servidor >.<")
}