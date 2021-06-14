module.exports = {
  name: "work",
  description: "Trbaja para ganar dinero (y gana experiencia)",
  use: "",
  category: 'economia',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
let db = require("megadb")
let cn = new db.crearDB("cooldown")
let money = new db.crearDB("economy")
let lvl = new db.crearDB("niveles")
//PARTE DE niveles

if(!lvl.has(message.author.id)){
  lvl.set(message.author.id+".xp", 0)
  lvl.set(message.author.id+".lvl", 1)
}
let user = message.author.id
let xp = await lvl.get(user+".xp")
let level = await lvl.get(user+".lvl")
lvl.sumar(user+".xp", (Math.floor(Math.random() * 20) + 1))
if(xp >= (5 * (level ^ 2) + 50 * level + 100)) { 
        lvl.sumar(user+".lvl", 1)
        message.reply("Has subido de nivel! Nuevo nivel " + (level+1)); 
    }

//PARTE DEL WORK
let ganancia = Math.floor(Math.random() * 500)
let trabajo = [
"Has trabajado como gasolinero",
"Has trabajado en un McDonald",
"Te han aceptado en una empresa muy importante",
"Has vendido muchas de tus cosas"
]
trabajo = trabajo[Math.floor(Math.random() * trabajo.length)]
  if(cn.has(message.author.id)) return message.channel.send("Tienes que esperar 5 segundos exactamente para poder usar este comando de vuelta") 
  let embed = new Discord.MessageEmbed() 
  .setTimestamp()
  .setThumbnail(message.author.displayAvatarURL())
  .setTitle(`${trabajo}`)
  .setDescription(`Y has ganado: ${ganancia}$`)
  .addField("En tu bolsillo:", `${await money.get(`${message.author.id}.cash`)+ganancia}`)
  .addField("En el banco internacional:", `${await money.get(`${message.author.id}.bank`)}`)
  .setColor("RANDOM")
  if(!money.has(`${message.author.id}`)) { 
  money.set(`${message.author.id}.cash`, 0)
  money.set(`${message.author.id}.bank`, 0)
  return message.channel.send("No estabas en la base de datos y te he añadido, vuelve a trabajar para ganar dinero")
  }
  money.sumar(`${message.author.id}.cash`, ganancia) 
    cn.set(message.author.id, "En cooldown pa")
  setTimeout(function(){
    cn.delete(message.author.id)
  }, 5000)
    message.channel.send(embed)

}
}