module.exports = {
  name: "createcustom",
  description: "Crea tu propio comando personalizado",
  use: "(commandName) (jscode)",
  premium: true,
  alias: [],
  category: "util",
  async run(client, message){
    message.channel.send("Este comando es ahora un SlashCommand, puedes volver a invitar al bot si no ves los SlashCommand")
    require("../ayuda/invite").run(client, message)
  },
  SlashCommand: {
    options: [{
      name: "commandname",
      type: "STRING",
      description: "Nombre del comando",
      required: true
    },
    {
      name: "jscode",
      type: "STRING",
      description: "Escribe el codigo en DiscordJS",
      required: true
    }],
    async run(client, message){
      let fs = require("fs")
      let commandName = message.options.getString("commandname")
      let jscode = message.options.getString("jscode").replace(process.env.TOKEN, " mitokennosetoca")
      if(!client.comandos.has(commandName)) {
   fs.writeFileSync("./bot/comandos/personalizados/"+commandName+".js", `module.exports = {
  name: "${commandName}",
  description: "An command made by an premium user",
  use: "[delete]",
  premium: true,
  alias: [],
  async run(client, message, args){
    if(message.guild.id !== "${message.guild.id}") return message.reply("Este comando solo está disponible para un servidor en especifico, crea tu propio comando obteniendo premium y ejecutando el comando \`/createcustom (commandname: name) (jscode: discordjscode)\`")
    if(args[0] === "delete") {
      message.reply("Comando eliminado")
      client.comandos.delete("${commandName}")
      return require("fs").unlinkSync("./bot/comandos/personalizados/${commandName}.js")
    }
    ${jscode}
  }
}`)   
      client.comandos.set(commandName, require("../personalizados/"+commandName+".js"))
      message.reply("Comando creado")
      }else{
        message.reply(" Ese comando ya existe")
      }
    }
  }
}