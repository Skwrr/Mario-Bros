module.exports = {
  name: "jumbo",
  description: "Observa un emoji grande",
  use: "(:emoji:)",
  category: "util",
  alias: [],
  async run(client, message, args){
    let prefix = require("megadb")
    prefix = new prefix.crearDB("prefixes")
    prefix = prefix.has(message.guild.id) ? await prefix.get(message.guild.id) : "mb."
    if(!args[0]) return message.reply("Debes escribir un emoji, si quieres ver una lista de ellos, usa \`"+prefix+"emojis\`")
    const emoji = require("discord.js").Util.parseEmoji(args[0])
    if(emoji.id == null) return message.reply("Ese no es un emoji válido")
    let link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`
    message.channel.send(link)
  }
}