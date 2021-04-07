module.exports = async (client, message, args, Discord) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**No tienes permiso para ejecutar este coma**")
  let encuesta = args.join(" ");

  if (!encuesta)
    return message.channel.send(
      ":pencil: **Escribe alguna cosa a la que votar**"
    );

  message.delete();
  const embed = new Discord.RichEmbed()
    .setDescription(encuesta)
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp()
    .setColor(0x6766cc);
  const msg = await message.channel.send(embed);
  await msg.react("611203741441327117");
  await msg.react("611200731059322909");
};
