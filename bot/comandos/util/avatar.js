module.exports = {
  name: "avatar",
  description: "Obten el avatar de un usuario (o de ti mismo)",
  use: "[@user]",
  category: 'util',
  alias: ["av"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  let img = message.mentions.users.first();
      if (!img) {
        const embed = new Discord.MessageEmbed()
          .setImage(`${message.author.displayAvatarURL({dynamic: true, size: 1024})}`)
          .setColor(0x66b3ff)
          .setFooter(
            `Avatar de ${message.author.username}#${message.author.discriminator}`
          );
        message.channel.send({ embed });
      } else if (img.displayAvatarURL() === null) {
        message.channel.send(
          "El usuario (" + img.username + ") no tiene avatar!"
        );
      } else {
        const embed = new Discord.MessageEmbed()
          .setImage(`${img.displayAvatarURL()}`)
          .setColor(0x66b3ff)
          .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
        message.channel.send({ embed });
      }
  }
}