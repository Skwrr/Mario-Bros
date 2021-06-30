module.exports = {
  name: "button",
  description: "Genera un botón",
  use: "",
  category: "diversion",
  alias: [],
  async run(client, message) {
    const { MessageButton } = require("discord-buttons")
    let btn = new MessageButton()
    .setLabel("Webpage")
    .setStyle("url")
    .setURL("https://sepoxcraft48yt.sergioesquina.repl.co/")
    await message.channel.send("Si quieres ver mi pagina web, clicka en el botón (en desarrollo)", btn)
  }
}