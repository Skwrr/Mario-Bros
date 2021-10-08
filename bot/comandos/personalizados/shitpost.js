module.exports = {
  name: "shitpost",
  description: "An command made by a premium user",
  use: "[delete]",
  category: "personalizados",
  premium: true,
  alias: [],
  Custom: "832737085533585489",
  async run(client, message, args){
    if(message.guild.id !== "832737085533585489") return message.reply("Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` en tu servidor y accede al panel del bot")
    if(args[0] === "delete") {
      message.reply("Comando eliminado")
      client.comandos.delete("shitpost")
      return require("fs").unlinkSync(__dirname+"/shitpost.js")
    }
    let shitpost = require("discord-shitpost")
message.reply(shitpost.allShitpost())
  }
}