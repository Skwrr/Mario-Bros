module.exports = async(client, message, args, Discord) => {
  const db = require("megadb")
  const store = new db.crearDB("store")
  
  let n = 0;
  let b = await store.get(message.guild.id);
  if(!store.has(message.guild.id)){
    store.set(message.guild.id+".Monedas-Diarias", 0)
  }
  if(!args[0])(
  store.map(`${message.guild.id}`, (v) =>
    `${b} - ${v}`).then(d => {
      const embed = new Discord.MessageEmbed()
      .setTitle("Store")
      .addField("Los items:", d.join("\n"))
      .setColor("RANDOM")
      return message.channel.send(embed)
    })
  )
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