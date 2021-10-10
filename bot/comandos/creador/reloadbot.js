module.exports = {
  name: "reloadbot",
  description: "Reinicia el bot",
  use: "",
  perms: {
    owner: process.env.OWNERS_ID
  },
  alias: ["relbot", "rbot"],
  category: "creador",
  async run(client, message){
    message.reply("Reiniciando el bot, nos vemos dentro de unos minutos")
    process.reload()
  }
}