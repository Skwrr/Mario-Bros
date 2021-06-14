module.exports = {
  name: "hola",
  description: "Hola",
  use: "",
  category: 'diversion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  message.channel.send("hola :3");
}
}