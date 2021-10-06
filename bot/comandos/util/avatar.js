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
        message.channel.send({ embeds: [embed] });
      } else if (img.displayAvatarURL() === null) {
        message.channel.send(
          "El usuario (" + img.username + ") no tiene avatar!"
        );
      } else {
        const embed = new Discord.MessageEmbed()
          .setImage(`${img.displayAvatarURL()}`)
          .setColor(0x66b3ff)
          .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
        message.channel.send({ embeds: [embed] });
      }
  },
  SlashCommand: {
    options: [
      {
        name: "user",
        description: "Menciona a un usuario",
        type: "MENTIONABLE",
        required: false
      }
    ],
    async run(client, message, args){
      const Discord = require("discord.js")
  let img = args.getMentionable("user")
      if (!img) {
        const embed = new Discord.MessageEmbed()
          .setImage(`${message.user.displayAvatarURL({dynamic: true, size: 1024})}`)
          .setColor(0x66b3ff)
          .setFooter(
            `Avatar de ${message.user.username}#${message.user.discriminator}`
          );
        message.reply({ embeds: [embed] });
      } else if (img.user.displayAvatarURL() === null) {
        message.reply(
          {content:"El usuario (" + img.user.username + ") no tiene avatar!", ephemeral: true}
        );
      } else {
        const embed = new Discord.MessageEmbed()
          .setImage(`${img.user.displayAvatarURL()}`)
          .setColor(0x66b3ff)
          .setFooter(`Avatar de ${img.user.username}#${img.user.discriminator}`);
        message.reply({ embeds: [embed] });
      }
    }
  }
}