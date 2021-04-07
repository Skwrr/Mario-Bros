module.exports = async(client, message, args, Discord) => {
  let db = require("megadb")
  let ipdb = new db.crearDB("ipdb")
  let mci = require("minecraft-information")
  let ip = ipdb.get(message.guild.id)
  let info = await mci.server(ip)
  let favicon = await mci.server_icon(ip)
  try{

  
      const embed = new Discord.RichEmbed()
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