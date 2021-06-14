module.exports = {
  name: "bugreport",
  description: "Reporta un bug sobre el bot",
  use: "(bug/bl/wl/reply) (user)",
  category: 'ayuda',
  alias: ["br"],
  async run(client, message, args) {
    const Discord = require("discord.js")
    message.delete();
    const bug = args.slice(0).join(" ")
    const db = require("megadb");
    let blbr = new db.crearDB("blbr");
    if (args[0] === 'bl'){
      if (!args[1]) return message.channel.send('Escribe la id del jugador para blacklistear')
      if (message.author.id !== '466241681654808576') return message.reply('Solo puede agregar gente a la lista negra mi creador')
      blbr.establecer(`${args[1]}`, "") 
      return message.channel.send(`Se ha añadido el jugador <@${args[1]}> a la blacklist`)
    
    }
    if (args[0] === 'reply'){
      if (message.author.id !== '466241681654808576') return message.reply("Este subcomando solo lo puede usar mi creador")
      if (!args[1]) return message.channel.send("Escriba una id")
      client.users.cache.get(args[1]).send('Su reporte fue atendido correctamente y fue arreglado, gracias por reportarlo :)')
      message.channel.send("<:gapple:611203741441327117>").then(m => {
        m.delete({timeout: 5000})
      })
      return
    }
    if (args[0] === 'wl'){
      if (message.author.id !== '466241681654808576') return message.reply("Este subcomando solo lo puede usar mi creador")
      if (!args[1]) return message.channel.send('Escriba la id para whitelistear')
      blbr.delete(args[1])
      message.channel.send('La id a sido whitelisteada')
    
      return
    }
    const bl = blbr.has(message.author.id)
    if (bl) {
      return message.reply("Estas en la lista negra de usar este comando por mal-usarlo").then(m => {
        m.delete({timeout: 2000})
      })
    } else {
      if (!bug) return message.channel.send('Escriba el bug').then(m => {
        m.delete({timeout: 2000})
      })
      const embed = new Discord.MessageEmbed()
      .setDescription(`Reporte de ${message.author.username}#${message.author.discriminator}`)
      .setColor("RANDOM")
      .addField(`${bug}`, `${message.author.id}`)
      client.channels.cache.get('726518343921696849').send(embed)
      message.channel.send("Su reporte de un bug ha sido enviado correctamente").then(m => {
        m.delete({timeout: 5000})
      })
    }
  
  }
}