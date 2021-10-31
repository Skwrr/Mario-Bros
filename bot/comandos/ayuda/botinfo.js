module.exports = {
  name: "botinfo",
  description: "Observa la info del bot",
  use: "",
  category: "ayuda",
  alias: [],
  premium: false,
  async run(client, message, args, db){
    const moment = require("moment")
    let uptime = moment.duration(client.uptime).format(" D [días] H [hrs] m [mins] s [segs] ")
    let command = new db.crearDB("commands")
    let Discord = require("discord.js")
    let {getMemoryUsage} = require("../functions")
    let memoria = getMemoryUsage();
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("Info del bot", client.user.avatarURL())
    .addField("Dueño", `\`${client.users.resolve("466241681654808576").tag}\``)
    .addField("Version DiscordJS", `\`${Discord.version}\``) 
    .addField("Memoria libre", `\`${memoria.max}\``, true)
    .addField("Memoria usada", `\`${memoria.used}\``, true)
    .addField("Uptime", `\`${uptime}\``)
    .addField("Servidores", `\`${client.guilds.cache.size}\``, true)
    .addField("Usuarios", `\`${client.users.cache.size}\``, true)
    .addField("Canales", `\`${client.channels.cache.size}\``, true)
    .addField("Conexiones a voz", `\`${client.voice.adapters.size}\``)
    .addField("Comandos Usados:", `\`${await command.get("times")}\``)
    
    message.channel.send({embeds: [embed]});
  }
}