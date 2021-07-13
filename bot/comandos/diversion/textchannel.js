module.exports = {
  name: "textchannel",
  description: "Crea tu propio canal de texto por 1h",
  use: "(name/add) (@users)",
  category: "diversion",
  alias: ["txtch","textch"],
  async run(client, message, args){
    let db = require("megadb")
    db = new db.crearDB("textchannels")
    const ms = require("ms")
    if(args[0] === 'add'){
      if(!db.has(`${message.guild.id}.${message.author.id}`)) return message.reply("No hay ningun canal a tu nombre")
      if(!args[1] || isNaN(args[1])) return message.reply("Debes poner la id de un usuario")
      message.guild.channels.cache.find(e => e.id === db.get(`${message.guild.id}.${message.author.id}`)).updateOverwrites(args[1],
        {
          'VIEW_CHANNEL': true, 'SEND_MESSAGES': true
        }
      )
      message.reply("Usuario añadido")
    }else{
      if(!args[0]) return message.reply("Debes escribir el nombre de un canal")
      try{
        if(db.has(`${message.guild.id}.${message.author.id}`)) return message.reply("Ya hay un canal")
        let chn = args[0].replace(/[^a-zA-z0-9 ]/g, '-').trim().toLowerCase()
        message.guild.channels.create(chn, {
          type: 'text',
          permissionOverwrites: [
            {
              id: message.guild.roles.cache.find(e => e.name === '@everyone').id,
              deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            },
            {
              id: message.author.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            },
          ],
          parent: message.channel.parent.id, 
        }).then(ch => {
          db.set(`${message.guild.id}.${message.author.id}`, ch.id)
          ch.delete({timeout: 3600000})
          setTimeout(() => db.delete(`${message.guild.id}.${message.author.id}`)) 
          ch.send(`<@${message.author.id}>`).then(u => u.delete({timeout: 500}))
        })
      }catch(err){
        message.channel.send("Ocurrió un error cuando ejecutaste el comando.\n"+err.message)
      }
    }
  }
}