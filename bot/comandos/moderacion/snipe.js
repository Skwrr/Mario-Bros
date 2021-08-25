module.exports = {
  name: "snipe",
  description: "Observa cuál fué el ultimo mensaje eliminado en este canal",
  use: "",
  category: "moderacion",
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
    try {
      const snipe = client.snipes
      if(!snipe.get(message.channel.id)) throw "error";
      let snip = snipe.get(message.channel.id)
      let embed = new Discord.MessageEmbed()
      .setTitle(snip.author)
      .setDescription(snip.content)
      .setColor("RANDOM")
      .setTimestamp()
      .setThumbnail(snip.authorav)
      message.channel.send({embeds:[embed]})
      client.snipes.delete(message.channel.id)
    } catch (error) {
      let embed = new Discord.MessageEmbed()
      .setTitle("No hay ningún mensaje eliminado recientemente")
      .setColor("RANDOM")
      message.channel.send({embeds:[embed]})
    }
  }
}