module.exports = {
  name: "invite",
  description: "Obten la invitación del bot",
  use: "",
  category: 'ayuda',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
    const { MessageButton } = require("discord-buttons")
    let btn = new MessageButton()
    .setLabel("Invite")
    .setStyle("url")
    .setURL("https://discordapp.com/api/oauth2/authorize?client_id=662995691164925973&permissions=8&scope=bot")
    const embed = new Discord.MessageEmbed()
    .setDescription("Aqui tienes mi invitacion")
    .setColor("RANDOM");
    await message.channel.send({
      component: btn,
      embed: embed
    });
  }
}