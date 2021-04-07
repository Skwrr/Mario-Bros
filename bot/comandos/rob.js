module.exports = async(client, message, args, Discord) => {
  const db = require("megadb")
  const money = new db.crearDB("economy")
  let j = message.mentions.users.first()
  if(!j) return message.reply("Mencione a alguien para robarle")
  let td = await money.get(`${j.id}.cash`)
  let dg = Math.floor(Math.random() * td) + 1
  let p = Math.floor(Math.random() * 200) + 1

  if(j.id == message.author.id) return message.reply("No puedes robarte a ti mismo, seria... raro")
  if(!isNaN(args[0])) return message.reply("Tienes que mencionar a un usuario")

  if(td < 200) return message.reply('No puedes robarle a alguien con tan poco dinero (menos de 200)')
  if(!money.has(j.id)) return message.reply("Ese usuario no esta en la base de datos!")

  const rw = new Discord.RichEmbed()
  .setTitle(`${message.author.tag} ha intentado robar a ${j.tag}`)
  .setDescription(`${message.author.tag} ha ganado ${await dg}`)
  .setTimestamp()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setColor("GREEN")


  const rl = new Discord.RichEmbed()
  .setTitle(`${message.author.tag} ha intentado robar a ${j.tag}`)
  .setDescription(`${message.author.tag} ha perdido ${await dg}`)
  .setTimestamp()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setColor("RED")

  if(p < 100){
    message.channel.send(rl)
    await money.restar(`${message.author.id}.cash`, dg)
    await money.sumar(`${j.id}.cash`, dg)
    return
  }else{
    message.channel.send(rw)
    await money.restar(`${j.id}.cash`, dg)
    await money.sumar(`${message.author.id}.cash`, dg)
    return
  }
}