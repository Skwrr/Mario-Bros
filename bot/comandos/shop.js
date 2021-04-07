module.exports = async(client, message, args, Discord) => {
  const db = require("megadb")
  const store = new db.crearDB("store")
  
  let n = 0;
  //let precio = store.get(`${message.guild.id}.${args[1].join(" ")}`)
  let b = await store.get(message.guild.id);
  if(!store.has(message.guild.id)){
    let a = {
      "Monedas Diarias": "Monedas Diarias"
    }
    store.set(message.guild.id, a)
  }
  if(!args[0])(
  store.map(`${message.guild.id}`, (v) =>
    `${b} - ${v}`).then(d => {
      const embed = new Discord.RichEmbed()
      .setTitle("Store")
      .addField("Los items:", d.join("\n"))
      .setColor("RANDOM")
      return message.channel.send(embed)
    })
  )
  if(args[0] === 'info'){
    if(!args[1]) return message.reply("Escriba el nombre del item")
    const embed = new Discord.RichEmbed()
      .setTitle(args.join(" ").slice(5).toUpperCase())
      .addField("Precio", "0")
      .setColor("RANDOM")
    return message.channel.send(embed)
  }
  
}