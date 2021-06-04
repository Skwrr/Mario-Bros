module.exports = async(client, message, args, Discord) => {
  const db = require("megadb")
  const money = new db.crearDB("economy")
  let sacar = args[0]
  let max = await money.get(`${message.author.id}.bank`)
  if(!sacar) return message.reply("Escriba algo de dinero para agregar al banco internacional")
  if(sacar === "all"){
    sacar = max
  }
  if(sacar > max){
    message.channel.send("No puedes sacar mas dinero del que tienes")
    return;
  }else if(sacar <= 0){
    message.channel.send("No puedes sacar menos dinero que 0")
    return;
  }
  if(isNaN(sacar)) return message.reply('Escriba una cantidad')

  let bank = await money.get(`${message.author.id}.bank`)

  await money.sumar(`${message.author.id}.cash`, sacar)
  await money.restar(`${message.author.id}.bank`, sacar)

  let cashf = await money.get(`${message.author.id}.cash`)
  let bankf = await money.get(`${message.author.id}.bank`)

  const embed = new Discord.MessageEmbed()
  .setThumbnail(message.author.displayAvatarURL())
  .setTitle("Has sacado del banco algo de dinero")
  .setDescription("Sacaste "+sacar+"$ del banco")
  .addField("En tu bolsillo:", cashf)
  .addField("En el banco:", bankf)
  .setTimestamp()
  .setColor("RANDOM")
  message.channel.send(embed)
}