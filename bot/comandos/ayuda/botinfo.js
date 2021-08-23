module.exports = {
  name: "botinfo",
  description: "Observa la info del bot",
  use: "",
  alias: [],
  premium: false,
  async run(client, message, args){
    const moment = require("moment")
    let uptime = moment.duration(client.uptime).format(" D [días] H [hrs] m [mins] s [segs] ")
    let Discord = require("discord.js")
    let {getMemoryUsage} = require("../functions")
    let memoria = getMemoryUsage();
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("Info del bot", client.user.avatarURL())
    .addField("`Dueño`", `${client.users.resolve("466241681654808576").tag}`)
    .addField("`Libreria`", `${Discord.version}`) 
    .addField("`Memoria libre`", `${memoria.max}`, true)
    .addField("`Memoria usada`", memoria.used, true)
    .addField("`Uptime`", `${uptime}`)
    .addField("`Servidores`", `${client.guilds.cache.size}`)
    .addField("`Usuarios`", `${client.users.cache.size}`)
    .addField("`Canales`", `${client.channels.cache.size}`)
    .addField("`Conexiones a voz`", `${client.voice.connections.size}`)
    
    message.channel.send(embed);
  }
}