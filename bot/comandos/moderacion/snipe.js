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
      if(!snipe.get("author") || snipe.get("author") === undefined && !snipe.get("message") || snipe.get("message") === undefined) throw "error";
      let embed = new Discord.MessageEmbed()
      .setTitle(snipe.get("author"))
      .setDescription(snipe.get("message"))
      .setColor("RANDOM")
      .setTimestamp()
      .setThumbnail(snipe.get("authorav"))
      message.channel.send(embed)
      client.snipes = {}
      delete client.snipes
    } catch (error) {
      let embed = new Discord.MessageEmbed()
      .setTitle("No hay ningún mensaje eliminado recientemente")
      .setColor("RANDOM")
      message.channel.send(embed)
    }
  }
}