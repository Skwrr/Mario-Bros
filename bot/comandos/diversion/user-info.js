module.exports = {
  name: "user-info",
  description: "Obten información sobre un usuario",
  use: "(@user)",
  category: 'diversion',
  alias: ["userinfo", "ui"],
  async run(client, message, args) {
    const Discord = require("discord.js")

  let userm = message.mentions.users.first();
      if (!userm) {
        var user = message.mentions.users.first() || message.author

        const embed = new Discord.MessageEmbed()
          .setThumbnail(user.displayAvatarURL())
          .setAuthor(user.username + "#" + user.discriminator, user.displayAvatarURL({dynamic: true, size: 1024}))
          .addField(
            "Jugando a",
            user.presence.game != null ? user.presence.game.name : "Nada",
            true
          )
          .addField("ID", user.id, true)
          .addField("Estado", user.presence.status, true)
          .addField("Apodo", message.member.nickname, true)
          .addField("Cuenta Creada", user.createdAt.toDateString(), true)
          .addField("Fecha de Ingreso", message.member.joinedAt.toDateString())
          .addField("Roles", message.member.roles.cache.map(roles => `\`${roles.name}\``).join(", "))
          .setColor(0x66b3ff);

        message.channel.send({ embed });
      } else {
        const embed = new Discord.MessageEmbed()
          .setThumbnail(userm.displayAvatarURL({dynamic: true, size: 1024}))
          .setAuthor(
            userm.username + "#" + userm.discriminator,
            userm.displayAvatarURL()
          )
          .addField(
            "Jugando a",
            userm.presence.game != null ? userm.presence.game.name : "Nada",
            true
          )
          .addField("ID", userm.id, true)
          .addField("Estado", userm.presence.status, true)
          .addField("Cuenta Creada", userm.createdAt.toDateString(), true)
          .setColor(0x66b3ff);

        message.channel.send({ embed });
      }
}
}