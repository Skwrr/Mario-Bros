module.exports = {
  name: "hola",
  description: "Hola",
  use: "",
  category: 'diversion',
  alias: [],
  async run(client, message, args) {
    message.reply("hola :3")
  },
  SlashCommand: {
    async run(client, message){
      message.reply("hola :3")
    }
  }
}