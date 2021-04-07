module.exports = (client, message, args, Discord) => {
  var server = message.guild;

      const embed = new Discord.RichEmbed()
        .setThumbnail(server.iconURL)
        .setAuthor(server.name, server.iconURL)
        .addField("ID", server.id, true)
        .addField("Region", server.region, true)
        .addField("Creado el", server.joinedAt.toDateString(), true)
        .addField(
          "Dueño del Servidor",
          server.owner.username +
            "#" +
            server.owner.discriminator +
            " (" +
            server.owner.id +
            ")",
          true
        )
        .addField("Miembros", server.memberCount, true)
        .addField("Roles", server.roles.size, true)
        .setColor(0x66b3ff);

      message.channel.send({ embed });
}