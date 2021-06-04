module.exports = (client, message, args, Discord) => {
      const embed = new Discord.MessageEmbed()
        .setThumbnail(message.guild.iconURL())
        .setAuthor(message.guild.name, message.guild.iconURL())
        .addField("ID", message.guild.id, true)
        .addField("Region", message.guild.region, true)
        .addField("Creado el", message.guild.joinedAt.toDateString(), true)
        .addField(
          "Dueño del Servidor",
          
            "<@"+message.guild.ownerID+"> (" +
            message.guild.ownerID +
            ")",
          true
        )
        .addField("Miembros", message.guild.memberCount, true)
        .addField("Roles", message.guild.roles.cache.size, true)
        .setColor(0x66b3ff);

      message.channel.send({ embed });
}