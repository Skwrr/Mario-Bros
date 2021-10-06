module.exports = {
  name: "8ball",
  description: "Obten una respuesta mía sobre una pregunta tuya",
  use: "(question)",
  category: 'diversion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  let texto = args.slice(0).join(" ");

      var rpts = [
        "Sí",
        "No",
        "¿Por qué?",
        "Por favor",
        "Tal vez",
        "No sé",
        "Definitivamente?",
        "¡Claro!",
        "Sí",
        "No",
        "Por supuesto!",
        "Por supuesto que no",
        "Enserio?",
        ":v",
        "ESTOY MIMENTO LCDTM, DEJAME MIMIR"
      ];
      let prefix = new (require("megadb")).crearDB("prefixes").get(message.guild.id)
      if(!prefix || prefix === undefined) prefix = "k!"
      if (!texto)
        return message.channel.send(
          `Escriba una pregunta, \`${await prefix}8ball (pregunta)\``
        );
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
        if(!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_MESSAGES")){
          if(message.content.toLowerCase().includes("@everyone") || message.content.toLowerCase().includes('@here')){
            return message.reply("No puedes mencionar `@ everyone` ni `@ here`")
            message.delete()
          }
        if (links.some(link => message.content.toLowerCase().includes(link))){
          return message.reply("No puedes enviar ningun link")
          message.delete()
        }
        if(message.mentions.roles.first() || message.guild.roles.cache.some(role => message.content.includes(role.id))) return message.reply("No puedes mencionar roles")
        }else{
          message.author.send("Tienes permisos de Administrador o de Manage_Messages, así que, tienes un bypass para los links y el @everyone/@here y roles")
        }
      message.channel.send("\nPregunta: \n`" +
          texto +
          "`\nRespuesta: \n`" +
          rpts[Math.floor(Math.random() * rpts.length)] +
          "`"
      );
  }
}