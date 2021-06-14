module.exports = {
  name: "say",
  description: "Hazme decir algo",
  use: "(texto)",
  category: 'diversion',
  alias: ["decir"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const everyone = message.guild.roles.cache.find(m => m.name == '@everyone');
  const links = [
    "https://",
    "http://",
    "http",
    "https",
    "discord.gg",
    "https://discord.gg",
    "discord gg",
    "discord,gg",
    "discord, gg",
    "discord. gg",
    "discord . gg",
    "discord .gg",
    "discord, gg",
    "discord , gg",
    "discord ,gg",
    ".com",
    ".es",
    ".org",
    ".net",
    ".io",
    ",com",
    ",es",
    ",org",
    ",net",
    ",io"
  ]
  let texto = args.join(" ");
      if (!texto)
        return message.channel.send(`Escriba un contenido para decir.`);
        if(!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_MESSAGES")){
          if(message.content.toLowerCase().includes(everyone) || message.content.toLowerCase().includes('@here')){
            return message.reply("No puedes mencionar `@ everyone` ni `@ here`")
            message.delete()
          }
        if (links.some(link => message.content.toLowerCase().includes(link))){
          return message.reply("No puedes enviar ningun link")
          message.delete()
        }
        }else{
          message.author.send("Tienes permisos de Administrador o de Manage_Messages, así que, tienes un bypass para los links y el @everyone/@here")
        }
        
      message.delete();
      message.channel.send(texto);
}
}