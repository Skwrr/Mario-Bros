module.exports = {
  name: "reglas",
  description: "An command made by an premium user",
  use: "[delete]",
  premium: true,
  alias: [],
  async run(client, message, args){
    if(message.guild.id !== "878770744446840843") return message.reply("Este comando solo está disponible para un servidor en especifico, crea tu propio comando obteniendo premium y ejecutando el comando `/createcustom (commandname: name) (jscode: discordjscode)`")
    if(args[0] === "delete") {
      message.reply("Comando eliminado")
      client.comandos.delete("reglas")
      return require("fs").unlinkSync("./bot/comandos/personalizados/reglas.js")
    }
    message.reply("Estas son las reglas\n\nNo ser tóxico\nNo spamear\nNo faltar el respeto\nNo compartir contenido que pueda ser malo para los demás")
  }
}