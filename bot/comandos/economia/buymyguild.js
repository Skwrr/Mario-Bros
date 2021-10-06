module.exports = {
  name: "buymyguild",
  description: "Compra TODOS mis servidores",
  use: "(time)",
  category: 'economia',
  alias: ["bmg"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const ms = require("ms")
  const db = require("megadb")
  const economydb = new db.crearDB("economy")
  if(!args[0]){
  const embed = new Discord.MessageEmbed()
  .setTitle("Menu")
  .setDescription("Debes seleccionar la cantidad de tiempo que esté activa la invite")
  .addField("¿Cuánto tiempo quieres que dure las invites?", "7d, 1d, 12h, 6h, 1h, 30m")
  .setColor("RANDOM")
  .setTimestamp()
  .setThumbnail(message.author.displayAvatarURL())
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  return message.channel.send({embeds: [embed]})
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
      const channel = guild.channels.cache.filter(x => x.type === "GUILD_TEXT").random()//.map(channel => channel.id).join("\n")
      if(!guild) return message.reply("No existe ese servidor")
      let t= ms(args[0])/1000
      const invite = await channel.createInvite({maxAge: t, maxUses: 1})
      setTimeout(() => message.author.send(`${guild.name} - ${invite}`),1500)
    }) 
    message.reply("Mira tus MDs")
  }
}
}