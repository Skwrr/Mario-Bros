module.exports = {
  name: "reloadbot",
  description: "Reinicia el bot",
  use: "",
  alias: ["relbot", "rbot"],
  category: "creador",
  async run(client, message){
    message.reply("Reiniciando el bot, nos vemos dentro de unos minutos")
    process.reload()
  }
}