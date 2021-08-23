module.exports = {
  name: "user-info",
  description: "Obten información sobre un usuario",
  use: "(@user)",
  category: 'util',
  alias: ["userinfo", "ui"],
  async run(client, message, args) {
    const Discord = require("discord.js")

  let userm = message.mentions.members.first() || message.guild.members.resolve(args[0])
      if (!userm) {
        var user = message.author

        const flags = await message.author.fetchFlags()
        const userFlags = flags.toArray()

        const embed = new Discord.MessageEmbed()
          .setThumbnail(user.displayAvatarURL())
          .setAuthor(user.username + "#" + user.discriminator, user.displayAvatarURL({dynamic: true, size: 1024}))
          .addField(
            "Jugando a",
            user.presence.game != null ? user.presence.game.name : "Nada",
            true
          )
          .addField("ID", user.id)
          .addField("Estado", user.presence.status)
          .addField("Insignias", userFlags.join("\n"))
          .addField("Apodo", message.member.nickname || "No tiene")
          .addField("Cuenta Creada", "<t:"+Math.floor(Number(user.createdAt/1000))+">")
          .addField("Fecha de Ingreso", "<t:"+Math.floor(Number(message.member.joinedAt/1000))+">")
          .addField("Roles", message.member.roles.cache.map(roles => `\`${roles.name}\``).join(", "))
          .setColor(0x66b3ff);

        message.channel.send({ embed });
      } else {
        const flags = await userm.user.fetchFlags()
        const userFlags = flags.toArray()
        let chnl = message.guild.channels.resolve(userm.lastMessageChannelID)
        let guild = message.guild
        let msgid = userm.lastMessageID
        let result
        try{
          result = "[Click Aquí](https://discord.com/channels/"+guild.id+"/"+chnl.id+"/"+msgid+")"
        }catch(error){
          result = "No hay ultimo msg"
        }
        const embed = new Discord.MessageEmbed()
          .setThumbnail(userm.user.displayAvatarURL({dynamic: true, size: 1024}))
          .setAuthor(
            userm.user.username + "#" + userm.user.discriminator,
            userm.user.displayAvatarURL()
          )
          .addField(
            "Jugando a",
            userm.presence.game != null ? userm.presence.game.name : "Nada",
            true
          )
          .addField("ID", userm.id)
          .addField("Estado", userm.presence.status)
          .addField("Insignias", userFlags.join("\n") || "No tiene")
          .addField("Apodo", userm.nickname || "No tiene")
          .addField("Cuenta Creada", "<t:"+Math.floor(Number(userm.user.createdAt/1000))+">")
          .addField("Fecha de Ingreso", "<t:"+Math.floor(Number(userm.joinedAt/1000))+">")
          .addField("Roles", userm.roles.cache.map(roles => `\`${roles.name}\``).join(", "))
          .addField(`Ultimo mensaje`, result)
          .setColor(0x66b3ff);

        message.channel.send({ embed });
      }
}
}