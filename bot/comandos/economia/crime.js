module.exports = {
  name: "crime",
  description: "Haz un crimen y gana dinero",
  use: "",
  category: 'economia',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const db = require("megadb")
  const money = new db.crearDB("economy")
  let dg = Math.floor(Math.random() * 2000) + 1
  let p = Math.floor(Math.random() * 200) + 1

  let f = [
    "Has atracado una lavandería",
    "Cuando ibas al parque, saqueste un puesto de helados",
    "Atracaste a una señora",
    "Robaste a los ricos"
  ]
  f = f[Math.floor(Math.random() * f.length)]

  const rw = new Discord.MessageEmbed()
  .setTitle(`${f}`)
  .setDescription(`${message.author.tag} ha ganado: ${dg}$`)
  .setTimestamp()
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setColor("GREEN")


  const rl = new Discord.MessageEmbed()
  .setTitle(`${f}`)
  .setDescription(`${message.author.tag} ha perdido: ${dg}$`)
  .setTimestamp()
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setColor("RED")

  if(p < 100){
    message.channel.send({embeds: [rl]})
    await money.restar(`${message.author.id}.cash`, dg)
    return
  }else{
    message.channel.send({embeds: [rw]})
    await money.sumar(`${message.author.id}.cash`, dg)
    return
  }
}
}