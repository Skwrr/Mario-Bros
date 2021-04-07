module.exports = async(client, message, args, Discord) => {
  const db = require("megadb")
  const money = new db.crearDB("economy")
  let dineroautor = message.mentions.users.first()
  if(!dineroautor) dineroautor = message.author
  let cash = await money.get(`${dineroautor.id}.cash`)
  let bank = await money.get(`${dineroautor.id}.bank`)
  if(!money.has(`${dineroautor.id}.bank`)) cash=0, bank=0;
  const embed = new Discord.RichEmbed()
  .setTitle(`Dinero de ${dineroautor.username}`)
  .setColor("RANDOM")
  .setDescription("Economia Internacional")
  .addField('En el bolsillo:', cash)
  .addField('En el banco:', bank)
  message.channel.send(embed)
}