module.exports = {
  name: "bal",
  description: "Obten el presupuesto de alguien",
  use: "(ammount)",
  category: 'economia',
  alias: ["balance"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const db = require("megadb")
  const money = new db.crearDB("economy")
  let dineroautor = message.mentions.users.first()
  if(!dineroautor) dineroautor = message.author
  let cash = await money.get(`${dineroautor.id}.cash`)
  let bank = await money.get(`${dineroautor.id}.bank`)
  if(!money.has(`${dineroautor.id}.bank`)) cash=0, bank=0;
  const embed = new Discord.MessageEmbed()
  .setTitle(`Dinero de ${dineroautor.username}`)
  .setColor("RANDOM")
  .setDescription("Economia Internacional")
  .addField('En el bolsillo:', cash)
  .addField('En el banco:', bank)
  message.channel.send(embed)
}
}