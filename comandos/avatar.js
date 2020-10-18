module.exports = (client, message, args, Discord) => {
  let img = message.mentions.users.first();
      if (!img) {
        const embed = new Discord.RichEmbed()
          .setImage(`${message.author.avatarURL}`)
          .setColor(0x66b3ff)
          .setFooter(
            `Avatar de ${message.author.username}#${message.author.discriminator}`
          );
        message.channel.send({ embed });
      } else if (img.avatarURL === null) {
        message.channel.sendMessage(
          "El usuario (" + img.username + ") no tiene avatar!"
        );
      } else {
        const embed = new Discord.RichEmbed()
          .setImage(`${img.avatarURL}`)
          .setColor(0x66b3ff)
          .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
        message.channel.send({ embed });
      }
}