const db = require("megadb")
module.exports = async(client, message, args, Discord) => {
  const store = new db.crearDB("store")
  
  let b = await store.get(message.guild.id);
  console.log(b)
  if(!store.has(message.guild.id)){
    store.set(message.guild.id+".PremiumBOT", 2000000000)
    return message.reply("Ejecute este comando otra vez, la lista ha sido cargada correctamente")
  }
  if(!args[0]){
  store.map(`${message.guild.id}`, (v) =>
    `${b} - ${v}`).then(async d => {
      const embed = new Discord.MessageEmbed()
      .setTitle("Store")
      .setDescription(d.slice(0, 10).join('\n'))
      .setColor("RANDOM")
      console.log(d)
      return message.channel.send(embed)
    })
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