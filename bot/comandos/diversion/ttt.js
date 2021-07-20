module.exports = {
  name: "ttt",
  description: "Juega al clasico 3 en raya",
  use: "(@user)",
  category: 'diversion',
  alias: ["tictactoe", "3raya", "3enraya", "ter", "tresenraya"],
  async run(client, message, args) {
    const tresenraya = require("tresenraya")
    const Discord = require("discord.js")
    const usuario = message.mentions.members.first()
    let db = require("megadb")
    db = new db.memoDB("ticktactoegames")

    const AI = require("ai-tic-tac-toe")

    if(db.has(message.guild.id)) return message.reply("Ya hay una partida en curso")

    if(!usuario) return message.reply("Debes mencionar a un usuario")
    if(usuario.id === message.author.id) return message.reply("No puedes jugar contra tí, puedes jugar solo si me mencionas")
    if(usuario.id === client.user.id) {
      const partida = new tresenraya.partida({ jugadores: [message.author.id, usuario.id] });

    const embed = new Discord.MessageEmbed()
    .setTitle("LOL")
    .setDescription("Puedes ver esto?")
    .setColor("RANDOM")
    .setFooter("Creditos al npm `tresenraya`")
    .setTimestamp()
    .setThumbnail(message.guild.iconURL())
    partida.turno.jugador = message.author.id
    embed.setTitle('Empieza ' + client.users.resolve(partida.turno.jugador).username + ', elige un número del 1 al 9 [`' + partida.turno.ficha + '`]')
    embed.setDescription(partida.tablero.string)

    message.channel.send(embed).then(e => {
      db.set(message.guild.id, e.id)

    partida.on('ganador', (jugador, tablero, paso) => {
      db.delete(message.guild.id)
      embed.setTitle("Ha ganado **"+client.users.resolve(jugador).username+"**!")
      embed.setDescription(tablero.string)

      e.edit(embed);

    });

    partida.on('empate', (jugadores, tablero, paso) => {
      db.delete(message.guild.id)

      embed.setTitle("Hubo un empate entre **"+jugadores.map(x => client.users.resolve(x).username).join("** y **")+"**")
      embed.setDescription(tablero.string)

      e.edit(embed)

    });
    ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '528988083513982977'].forEach(emoji => {
      e.react(emoji)
    })
    e.awaitReactions(async(reaction, user) => {
      if(user.bot) return
      
      if(user.id !== partida.turno.jugador) return
      if(reaction.emoji.name === "1️⃣") {
        
        if(partida.disponible('1')) partida.elegir('1')
      }else
      if(reaction.emoji.name === "2️⃣") {
        
        if(partida.disponible('2')) partida.elegir('2')
      }else
      if(reaction.emoji.name === "3️⃣") {
        
        if(partida.disponible('3')) partida.elegir('3')
      }else
      if(reaction.emoji.name === "4️⃣") {
        
        if(partida.disponible('4')) partida.elegir('4')
      }else
      if(reaction.emoji.name === "5️⃣") {
        
        if(partida.disponible('5')) partida.elegir('5')
      }else
      if(reaction.emoji.name === "6️⃣") {
        
        if(partida.disponible('6')) partida.elegir('6')
      }else
      if(reaction.emoji.name === "7️⃣") {
        
        if(partida.disponible('7')) partida.elegir('7')
      }else
      if(reaction.emoji.name === "8️⃣") {
        
        if(partida.disponible('8')) partida.elegir('8')
      }else
      if(reaction.emoji.name === "9️⃣") {
        
        if(partida.disponible('9')) partida.elegir('9')
      }else
      if(reaction.emoji.name === "yeg"){
        partida.finalizar()
      }else{
        return
      }

      if (partida.finalizado) {
        embed.setDescription(partida.tablero.string)
        embed.setTitle(`Partida finalizada por ${client.users.resolve(user.id).username}`)
        db.delete(message.guild.id)
        return e.edit(embed)

      }
      embed.setDescription(partida.tablero.string)
      embed.setTitle(`Turno de ${client.users.resolve(partida.turno.jugador).username} [${partida.turno.ficha}]`)
      e.edit(embed);
      let ficha
      let fichapos
      if(partida.turno.ficha === "❌") {
        ficha = "x"
      }else{
        ficha = "o"
      }
      fichapos = AI.getmove(partida.tablero.array, ficha)
      setTimeout(() => {
        console.log(ficha)
        console.log(fichapos)
        if(partida.disponible(fichapos)) partida.elegir(fichapos)
        embed.setDescription(partida.tablero.string)
        embed.setTitle(`Turno de ${client.users.resolve(partida.turno.jugador).username} [${partida.turno.ficha}]`)
        e.edit(embed);
      }, 3000)
    })
        })
        return
    }else{
    message.channel.send(`<@${usuario.id}> aceptas jugar una partida al 3 en raya contra <@${message.author.id}>?`).then(async me => {
      await me.react('👍')
      await me.react('👎')
      me.awaitReactions((r, u) => {
        if(u.bot) return
        if(u.id !== usuario.user.id) return
        if(r.emoji.name === '👎') {
          me.delete()
          if(usuario.nickname === null) return message.channel.send(`<@${message.author.id}>, ${usuario.user.username} ha rechazado tu propuesta`)
          return message.channel.send(`<@${message.author.id}>, ${usuario.nickname} ha rechazado tu propuesta`)
        }else
        if(r.emoji.name === '👍') {
          me.delete()

    const partida = new tresenraya.partida({ jugadores: [message.author.id, usuario.id] });

    const embed = new Discord.MessageEmbed()
    .setTitle("LOL")
    .setDescription("Puedes ver esto?")
    .setColor("RANDOM")
    .setFooter("Creditos al npm `tresenraya`")
    .setTimestamp()
    .setThumbnail(message.guild.iconURL())
    embed.setTitle('Empieza ' + client.users.resolve(partida.turno.jugador).username + ', elige un número del 1 al 9 [`' + partida.turno.ficha + '`]')
    embed.setDescription(partida.tablero.string)

    message.channel.send(embed).then(e => {
      db.set(message.guild.id, e.id)

    partida.on('ganador', (jugador, tablero, paso) => {
      db.delete(message.guild.id)
      embed.setTitle("Ha ganado **"+client.users.resolve(jugador).username+"**!")
      embed.setDescription(tablero.string)

      e.edit(embed);

    });

    partida.on('empate', (jugadores, tablero, paso) => {
      db.delete(message.guild.id)

      embed.setTitle("Hubo un empate entre **"+jugadores.map(x => client.users.resolve(x).username).join("** y **")+"**")
      embed.setDescription(tablero.string)

      e.edit(embed)

    });
    ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '528988083513982977'].forEach(emoji => {
      e.react(emoji)
    })
    e.awaitReactions(async(reaction, user) => {
      if(user.bot) return
      
      if(user.id !== partida.turno.jugador) return
      if(reaction.emoji.name === "1️⃣") {
        
        if(partida.disponible('1')) partida.elegir('1')
      }else
      if(reaction.emoji.name === "2️⃣") {
        
        if(partida.disponible('2')) partida.elegir('2')
      }else
      if(reaction.emoji.name === "3️⃣") {
        
        if(partida.disponible('3')) partida.elegir('3')
      }else
      if(reaction.emoji.name === "4️⃣") {
        
        if(partida.disponible('4')) partida.elegir('4')
      }else
      if(reaction.emoji.name === "5️⃣") {
        
        if(partida.disponible('5')) partida.elegir('5')
      }else
      if(reaction.emoji.name === "6️⃣") {
        
        if(partida.disponible('6')) partida.elegir('6')
      }else
      if(reaction.emoji.name === "7️⃣") {
        
        if(partida.disponible('7')) partida.elegir('7')
      }else
      if(reaction.emoji.name === "8️⃣") {
        
        if(partida.disponible('8')) partida.elegir('8')
      }else
      if(reaction.emoji.name === "9️⃣") {
        
        if(partida.disponible('9')) partida.elegir('9')
      }else
      if(reaction.emoji.name === "yeg"){
        partida.finalizar()
      }else{
        return
      }

      if (partida.finalizado) {
        embed.setDescription(partida.tablero.string)
        embed.setTitle(`Partida finalizada por ${client.users.resolve(user.id).username}`)
        db.delete(message.guild.id)
        return e.edit(embed)

      }
      embed.setDescription(partida.tablero.string)
      embed.setTitle(`Turno de ${client.users.resolve(partida.turno.jugador).username} [${partida.turno.ficha}]`)
      e.edit(embed);
    })
        })
        }
      })
    })
  }
  }
}