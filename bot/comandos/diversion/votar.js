module.exports = {
  name: "votar",
  description: "Haz una encuesta",
  use: "(vote)",
  category: 'diversion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("**No tienes permiso para ejecutar este coma**")
  let encuesta = args.join(" ");

  if (!encuesta)
    return message.channel.send(
      ":pencil: **Escribe alguna cosa a la que votar**"
    );

  message.delete();
  const embed = new Discord.MessageEmbed()
    .setDescription(encuesta)
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp()
    .setColor(0x6766cc);
  const msg = await message.channel.send({embeds: [embed]});
  await msg.react("611203741441327117");
  await msg.react("611200731059322909");
}
}