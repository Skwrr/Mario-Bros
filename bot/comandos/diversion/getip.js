module.exports = {
  name: "getip",
  description: "Obten información de un servidor de minecraft",
  use: "(ip)",
  category: 'diversion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  let mci = require("minecraft-information")
  let ip = args.join(" ")
  let info = await mci.server(ip)
  let favicon = await mci.server_icon(ip)
  try{

  
      const embed = new Discord.MessageEmbed()
      .setTitle('Server Data')
      .addField('Server IP', ip)
      .setImage(favicon)
      .setColor("RANDOM")
      .setThumbnail('https://cdn.glitch.com/402b9099-0636-457a-8ffb-faf65c857490%2F1.png?v=1585792839856')
      message.channel.send(embed)
  } catch (error) {
    message.channel.send("Ha ocurrido un error:\n"+error)
  }
}
}