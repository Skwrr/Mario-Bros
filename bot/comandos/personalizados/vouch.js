module.exports = {
  name: "vouch",
  description: "An command made by a premium user",
  use: "[delete]",
  category: "personalizados",
  premium: true,
  alias: [],
  Custom: "876201162192322572",
  async run(client, message, args){
    if(message.guild.id !== "876201162192322572") return message.reply("Este comando solo está disponible para uno de mis servidores **`premium`**, si quieres añadir tu propio comando totalmente customizado, adquiere `[premium]('https://krypton.sergioesquina.repl.co/getpremium/how')` en tu servidor y accede al panel del bot")
    if(args[0] === "delete") {
      message.reply("Comando eliminado")
      client.comandos.delete("vouch")
      return require("fs").unlinkSync(__dirname+"/vouch.js")
    }
    if(message.channel.name.toLowerCase().includes("vouch")) message.channel.send("<a:legit:904305339741114369>")
else message.channel.send("Chanal no válido").then(e => setTimeout(()=>e.delete(),3000))
  }
}