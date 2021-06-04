module.exports = (client, message, args, Discord) => {
    const embed = new Discord.MessageEmbed()
        .setDescription(
          "[Aqui tienes mi invitacion](https://discordapp.com/api/oauth2/authorize?client_id=662995691164925973&permissions=8&scope=bot)"
        )
        .setColor("RANDOM");
      message.channel.send({ embed });
}