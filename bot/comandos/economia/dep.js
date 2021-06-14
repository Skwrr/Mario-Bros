module.exports = {
  name: "dep",
  description: "Deposita dinero en el banco internacional",
  use: "(ammount/all)",
  category: 'economia',
  alias: ["d", "deposit"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const db = require("megadb")
  const money = new db.crearDB("economy")
  let agregar = args[0]
  let max = await money.get(`${message.author.id}.cash`)
  if(!agregar) return message.reply("Escriba algo de dinero para agregar al banco internacional")
  if(agregar === "all"){
    agregar = max
  }
  if(agregar > max){
    message.channel.send("No puedes agregar mas dinero del que tienes")
    return;
  }else if(agregar <= 0){
    message.channel.send("No puedes depositar menos dinero que 0")
    return
  }
  if(isNaN(agregar)) return message.reply('Escriba una cantidad')

  let cash = await money.get(`${message.author.id}.cash`)

  await money.sumar(`${message.author.id}.bank`, agregar)
  await money.restar(`${message.author.id}.cash`, agregar)

  let cashf = await money.get(`${message.author.id}.cash`)
  let bankf = await money.get(`${message.author.id}.bank`)

  const embed = new Discord.MessageEmbed()
  .setThumbnail(message.author.displayAvatarURL())
  .setTitle("Has agregado al banco algo de dinero")
  .setDescription("Agregaste "+agregar+"$ al banco")
  .addField("En tu bolsillo:", cashf)
  .addField("En el banco:", bankf)
  .setTimestamp()
  .setColor("RANDOM")
  message.channel.send(embed)
}
}