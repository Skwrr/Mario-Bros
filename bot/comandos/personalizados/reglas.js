module.exports = {
  name: "reglas",
  description: "An command made by an premium user",
  use: "[delete]",
  category: "personalizados",
  premium: true,
  alias: [],
  Custom: "878770744446840843",
  async run(client, message, args){
    if(message.guild.id !== "878770744446840843") return message.reply("Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` en tu servidor y accede al panel del bot")
    if(args[0] === "delete") {
      message.reply("Comando eliminado")
      client.comandos.delete("reglas")
      return require("fs").unlinkSync(__dirname+"/reglas.js")
    }
    message.reply("Estas son las reglas\n\nNo ser tóxico\nNo spamear\nNo faltar el respeto\nNo compartir contenido que pueda ser malo para los demás")
  }
}