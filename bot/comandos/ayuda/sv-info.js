module.exports = {
  name: "sv-info",
  description: "Obten información sobre el servidor",
  use: "",
  category: 'ayuda',
  alias: ["serverinfo", "svinfo", "si"],
  async run(client, message, args) {
    const moment = require("moment")
    const Discord = require("discord.js")
      const embed = new Discord.MessageEmbed()
        .setThumbnail(message.guild.iconURL())
        .setAuthor(message.guild.name, message.guild.iconURL())
        .addField("ID", message.guild.id, true)
        .addField("Region", message.guild.region, true)
        .addField("Me uní el", moment(message.guild.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss a"), true)
        .addField("Creado el", moment(message.guild.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a"), true)
        .addField("Dueño del Servidor", `${client.users.resolve(message.guild.ownerID).username ? client.users.resolve(message.guild.ownerID).username : "Error al encontrar al dueño"} (${message.guild.ownerID})`, true)
        .addField("Miembros", message.guild.memberCount, true)
        .addField("Roles", message.guild.roles.cache.size, true)
        .setColor(0x66b3ff);

      message.channel.send({
        embed: embed
      });
  }
}