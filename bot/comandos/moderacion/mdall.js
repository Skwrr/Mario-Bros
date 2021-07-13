module.exports = {
  name: "mdall",
  description: "Envíale un mensaje privado a todo el servidor",
  use: "(msg)",
  category: "moderation",
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("Te creías que era un bot raid?")
    if(!args[0]) return message.reply("Escriba algo para decirle a los usuarios")
    let array = []
    const embe = new Discord.MessageEmbed()
    .setTitle("Nuevo Mensaje")
    .setDescription(`Autor: ${message.author.username}\nServidor: ${message.guild.name}`)
    .addField("Mensaje:", args.join(" "))
    .setColor("BLUE")
    .setThumbnail(message.guild.iconURL())
    .setAuthor(message.author.tag,message.author.displayAvatarURL())
    message.guild.members.cache.forEach(member => {
      setTimeout(async() => {
        try{
          await member.send(embe)
        }catch(e){
          array.push(`Hubo un problema con ${member.username}\n${e}\n`)
        }
      }, 450)
    })
    if(array.length > 0){
      const embed = new Discord.MessageEmbed().setDescription(array)
      message.channel.send(embed)
      message.channel.send((message.guild.members.cache.size-array.length)+" usuarios alertados correctamente")
      message.channel.send(array.length+" usuarios no alertados por problemas")
    }else{
      message.channel.send(message.guild.members.cache.size+" usuarios alertados correctamente")
    }
  }
}