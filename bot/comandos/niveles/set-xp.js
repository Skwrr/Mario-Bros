module.exports = {
  name: "set-xp",
  description: "Establece el nivel a otro usuario",
  use: "(@user)",
  category: 'niveles',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const db = require("megadb")
  const lvl = new db.crearDB("niveles")

  const usuario = message.mentions.users.first()
  if(!usuario || (!isNaN(usuario))) return message.reply("Mencione a un usuario")
  const nx = args[1]
  if(nx != 'lvl' && nx != 'xp') return message.reply("Ese no es un argumento valido, escriba `lvl` o `xp`")
  const c = args[2]
  if(isNaN(c)) return message.reply("Escribe un numero")

  if(nx === 'lvl'){
    lvl.set(`${usuario.id}.${nx}`, c)
    message.channel.send(`Se ha establecido correctamente a ${usuario} ${c} niveles`)
  }
  if(nx === 'xp'){
    lvl.set(`${usuario.id}.${nx}`, c)
    message.channel.send(`Se ha establecido correctamente a ${usuario} ${c} de xp`)
  }
}
}