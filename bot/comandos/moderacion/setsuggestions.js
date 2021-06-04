const db = require("megadb")
const suggest = new db.crearDB("suggestionchannel")
module.exports = (client, message, args, Discord) => {
  suggest.establecer(message.guild.id, message.channel.id).then(()=> {
    message.channel.send("Canal de sugerencias estalecido, aca se mandaran todas las sugerencias").catch(e => {
      message.edit(e)
    })
  })
}