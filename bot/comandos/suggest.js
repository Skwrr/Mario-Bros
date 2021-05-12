let db = require("megadb")
let suggest = new db.crearDB("suggestionchannel")
module.exports = async(client, message, args, Discord) => {
  message.delete()
  if (!args.join(" ")) return message.channel.send("Escriba la sugerencia a enviar").then(m => {
    m.delete(6000)
  })
  let canaldesuggestion = await suggest.obtener(message.guild.id)
  if(!canaldesuggestion || canaldesuggestion === null) return message.channel.send(":x: | El canal de sugerencias no está establecido, contacte con un admin o si usted es moderador, escriba en el canal de sugerencias `hpsetsuggestions`").then(m => {
    m.delete(6000)
  })
  let suggestionembed = new Discord.RichEmbed()
  .setTitle("*Sugerencia nueva :D*")
  .setDescription(args.join(" "))
  .setFooter(`Sugerencia de ${message.author.username}`)
  .setColor("RANDOM")
  let cds = message.guild.channels.get(canaldesuggestion)
  cds.send(suggestionembed).then(async m => {
    await m.react("👍")
    await m.react("👎")
  })
  
}