module.exports = {
  name: "servidor",
  description: "Entra a mi servidor de soporte",
  use: "",
  category: 'ayuda',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
    message.channel.send("(Estas invitado a mi casa :D)[https://discord.gg/fwGj3ug]");
  }
}