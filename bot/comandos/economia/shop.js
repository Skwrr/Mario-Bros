const db = require("megadb")
module.exports = {
  name: "shop",
  description: "Compra algo",
  use: "(item)",
  category: 'economia',
  alias: ["buy"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  let store = new db.crearDB("store")
  
  let b = await store.get(message.guild.id);
  if(!store.has(message.guild.id)){
    store.set(message.guild.id+".PremiumBOT", 2000000000)
    return message.reply("Ejecute este comando otra vez, la lista ha sido cargada correctamente")
  }
  let guild = message.guild.id
  if(!args[0]){
    let items = [
      await b
    ]
    let i = 0
    items.forEach(async(item) => {
      console.log(item)
      i++
      items.push(item.i)
      console.log(item.i)
    })
    delete items[0]
    console.log(items)
    const embed = new Discord.MessageEmbed()
    .setTitle("Store")
    .setDescription(items)
    .setColor("RANDOM")
    return message.channel.send(embed)
  }
  if(args[0] === 'info'){
    if(!args[1]) return message.reply("Escriba el nombre del item")
    let precio = await store.get(`${message.guild.id}.${args[1].toLowerCase()}`)
    if(!store.has(`${message.guild.id}.${args[1].toLowerCase()}`)) return message.reply("Ese objeto no existe")
    const embed = new Discord.MessageEmbed()
      .setTitle(args[1].toUpperCase())
      .addField("Precio", store.get(`${precio}`))
      .setColor("RANDOM")
    return message.channel.send(embed)
  }
  
}
}