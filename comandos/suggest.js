let db = require("megadb")
let suggest = new db.crearDB("suggestionchannel")
module.exports = async(client, message, args, Discord) => {
  message.delete()
  if (!args.join(" ")) return message.channel.send("Escriba la sugerencia a enviar").then(m => {
    m.delete(6000)
  })
  let canaldesuggestion = await suggest.obtener(message.guild.id)
  let suggestionembed = new Discord.RichEmbed()
  .setTitle("*Sugerencia nueva :D*")
  .setDescription(args.join(" "))
  .setFooter(`Sugerencia de ${message.author.username}`)
  .setColor("RANDOM")
  let cds = message.guild.channels.get(canaldesuggestion)
  cds.send(suggestionembed).catch(() => {
    message.channel.send("Hubo un error al enviar el mensaje, asegurese de que estableció el canal de sugerencias en su servidor")
  })
  
}