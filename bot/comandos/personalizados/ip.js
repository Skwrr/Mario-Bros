module.exports = {
  name: "ip",
  description: "Obten la ip del servidor",
  use: "[set] (newIp)",
  category: 'personalizados',
  alias: [],
  Custom: "720657677323075584",
  async run(client, message, args) {
    const Discord = require("discord.js")
  let db = require("megadb")
  let ipdb = new db.crearDB("ipdb")
  if (message.guild.id === "720657677323075584") {
    if(message.member.permissions.has("ADMINISTRAOR")){
      if(!args[0]) return message.channel.send(await ipdb.get(message.guild.id))
      if(args[0] === 'set'){
        if(!args[1]) return message.reply('Escriba la nueva ip')
      ipdb.set(message.guild.id, args[1])
      message.channel.send("Ip establecida correctamente")
      return true;
    }else{
      return message.reply('Ese argumento no existe')
    }
    }
    return message.channel.send("No tenes perms")
  } else {
    message.channel.send(
      "Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` en tu servidor y accede al panel del bot"
    );
  }
}
}