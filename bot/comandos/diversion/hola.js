module.exports = {
  name: "hola",
  description: "Hola",
  use: "",
  category: 'diversion',
  alias: [],
  async run(client, message, args) {
    message.channel.send("Este comando es ahora un SlashCommand, puedes volver a invitar al bot si no ves los SlashCommand")
    require("../ayuda/invite").run(client, message)
  },
  SlashCommand: {
    async run(client, message){
      message.reply("hola :3")
    }
  }
}