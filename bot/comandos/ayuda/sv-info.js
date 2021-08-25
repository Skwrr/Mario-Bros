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
        .addField("Region", message.guild.preferredLocale, true)
        .addField("Me uní el", "<t:"+Number(Math.floor(message.guild.joinedAt/1000))+">", true)
        .addField("Creado el", "<t:"+Number(Math.floor(message.guild.createdAt/1000))+">", true)
        .addField("Dueño del Servidor", `${message.guild.members.resolve(await message.guild.ownerId).nickname || client.users.resolve(await message.guild.ownerId).username} (${await message.guild.ownerId})`, true)
        .addField("Miembros", message.guild.memberCount.toString(), true)
        .addField("Roles", message.guild.roles.cache.size.toString(), true)
        .setColor(0x66b3ff);

      message.channel.send({
        embeds: [embed]
      });
  }
}