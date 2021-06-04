module.exports = async(client, message, args, Discord) => {
  const ms = require("ms")
  const db = require("megadb")
  const economydb = new db.crearDB("economy")
  if(!args[0]){
  const embed = new Discord.MessageEmbed()
  .setTitle("Menu")
  .setDescription("Debes seleccionar la cantidad de tiempo que esté activa la invite")
  .addField("¿Cuánto tiempo quieres que dure las invites?", "1d, 2d, 5d, 30m, 15m, 5m")
  .setColor("RANDOM")
  .setTimestamp()
  .setThumbnail(message.author.displayAvatarURL())
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  return message.channel.send(embed)
  }else if(args[0]){


    let price
    if(args[0] === "1d") price = 14400
    if(args[0] === "7d") price = 100800
    if(args[0] === "12h") price = 7200
    if(args[0] === "6h") price = 3600
    if(args[0] === "1h") price = 600
    if(args[0] === "30m") price = 200
    if(args[0] !== "1d" && args[0] !== "7d" && args[0] !== "12h" && args[0] !== "6h" && args[0] !== "1h" && args[0] !== "30m" || isNaN(args[0][0])) return message.reply("No puedes ponerle esa duración")
    let dinero = economydb.get(`${message.author.id}.cash`)
    if(dinero < price) return message.reply("No tienes dinero suficiente en el bolsillo para comprar todas las invites, dinero necesario: "+price+"\nNecesitas: "+prize-economydb.get(`${message.author.id}.cash`))
    economydb.restar(`${message.author.id}.cash`, price)
    client.guilds.cache.forEach(async (guild) => {
      const channel = guild.channels.cache.filter(x => x.type === "text").random()//.map(channel => channel.id).join("\n")
      if(!guild) return message.reply("No existe ese servidor")
      let t= ms(args[0])/1000
      const invite = await channel.createInvite({maxAge: t, maxUses: 1})
      message.author.send(`${guild.name} - ${invite}`)
    })
  }
}