module.exports = {
  name: "discrim", 
  description: "Mira cuantos users hay con tu mismo tag!", 
  use: "", 
  category: "diversion", 
  alias: ["discriminator"], 
  async run(client, message, args){
    const Discord = require("discord.js")
    if(args.length > 0) return message.reply("Este comando no necesita argumentos")
    const embed = new Discord.MessageEmbed()
    .setTitle("Usuarios con el tag "+message.author.discriminator)
    client.users.cache.forEach(user => {
      if(user.discriminator === message.author.discriminator) embed.addField(user.tag, user.id+"\n").setColor("RANDOM")
    })
    message.channel.send(embed)
  }
}