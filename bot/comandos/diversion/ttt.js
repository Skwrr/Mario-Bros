module.exports = {
  name: "ttt",
  description: "Juega al clasico 3 en raya",
  use: "(@user)",
  category: 'beta',
  alias: ["tictactoe", "3raya", "3enraya", "ter", "tresenraya"],
  async run(client, message, args) {
    const Discord = require("discord.js")
    const user = message.mentions.members.first()

    let t
    let to

    if(!user) return message.reply("Debes mencionar a un usuario")
    message.channel.send(`<@${user.id}> aceptas jugar una partida al 3 en raya contra <@${message.author.id}>?`).then(async m => {
      await m.react('👍')
      await m.react('👎')
      m.awaitReactions((r, u) => {
        if(u.bot) return
        if(u.id !== user.user.id) return
        if(r.emoji.name === '👎') {
          m.delete()
          if(user.nickname === null) return message.channel.send(`<@${message.author.id}>, ${user.user.username} ha rechazado tu propuesta`)
          return message.channel.send(`<@${message.author.id}>, ${user.nickname} ha rechazado tu propuesta`)
        }else
        if(r.emoji.name === '👍') {
          t = Math.floor(Math.random() * 1)
          if(t === 0) to = message.member
          if(t === 1) to = user
          let p1 = '1'
          let p2 = '2'
          let p3 = '3'
          let p4 = '4'
          let p5 = '5'
          let p6 = '6'
          let p7 = '7'
          let p8 = '8'
          let p9 = '9'

          const embed = new Discord.MessageEmbed()
          .setTitle(`Turno de ${to.nickname}`)
          .setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
          .setFooter("Gracias por usar mi bot <3")
          .setTimestamp()
          .setThumbnail(to.user.displayAvatarURL())
          .setColor("RANDOM")
          if(to.nickname === null) embed.setTitle('Turno de '+to.user.username)
          m.delete()
          message.channel.send(embed).then(async y => {
            ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'].forEach(emoji => {
              y.react(emoji)
            })
            y.awaitReactions((react, usu) => {
              if(t === 0) to = message.member
              if(t === 1) to = user
              embed.setTitle(`Turno de ${to.nickname}`)
              embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
              embed.setFooter("Gracias por usar mi bot <3")
              embed.setTimestamp()
              embed.setThumbnail(to.user.displayAvatarURL())
              embed.setColor("RANDOM")
              if(to.nickname === null) embed.setTitle('Turno de '+to.user.username)
              if(usu.id !== to.user.id) return
              let turns = 0
              let winner = to
              switch(react.emoji.name){
                case "1️⃣":
                  if(t === 1){
                    turns++
                    if(usu.bot) return
                    react.remove()
                    p1 = "X"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t--)
                  }else if(t === 0){
                    if(usu.bot) return
                    react.remove()
                    p1 = "O"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t++)
                  }
                break;
                case "2️⃣":
                  if(t === 1){
                    turns++
                    if(usu.bot) return
                    react.remove()
                    p2 = "X"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t--)
                  }else if(t === 0){
                    if(usu.bot) return
                    react.remove()
                    p2 = "O"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t++)
                  }
                break;
                case "3️⃣":
                  if(t === 1){
                    turns++
                    if(usu.bot) return
                    react.remove()
                    p3 = "X"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t--)
                  }else if(t === 0){
                    if(usu.bot) return
                    react.remove()
                    p3 = "O"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t++)
                  }
                break;
                case "4️⃣":
                  if(t === 1){
                    turns++
                    if(usu.bot) return
                    react.remove()
                    p4 = "X"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t--)
                  }else if(t === 0){
                    if(usu.bot) return
                    react.remove()
                    p4 = "O"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t++)
                  }
                break;
                case "5️⃣":
                  if(t === 1){
                    turns++
                    if(usu.bot) return
                    react.remove()
                    p5 = "X"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t--)
                  }else if(t === 0){
                    if(usu.bot) return
                    react.remove()
                    p5 = "O"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t++)
                  }
                break;
                case "6️⃣":
                  if(t === 1){
                    turns++
                    if(usu.bot) return
                    react.remove()
                    p6 = "X"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t--)
                  }else if(t === 0){
                    if(usu.bot) return
                    react.remove()
                    p6 = "O"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t++)
                  }
                break;
                case "7️⃣":
                  if(t === 1){
                    turns++
                    if(usu.bot) return
                    react.remove()
                    p7 = "X"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t--)
                  }else if(t === 0){
                    if(usu.bot) return
                    react.remove()
                    p7 = "O"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t++)
                  }
                break;
                case "8️⃣":
                  if(t === 1){
                    turns++
                    if(usu.bot) return
                    react.remove()
                    p8 = "X"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t--)
                  }else if(t === 0){
                    if(usu.bot) return
                    react.remove()
                    p8 = "O"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t++)
                  }
                break;
                case "9️⃣":
                  if(t === 1){
                    turns++
                    if(usu.bot) return
                    react.remove()
                    p9 = "X"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t--)
                  }else if(t === 0){
                    if(usu.bot) return
                    react.remove()
                    p9 = "O"
                    embed.setDescription(`${p1} | ${p2} | ${p3}\n${p4} | ${p5} | ${p6}\n${p7} | ${p8} | ${p9}`)
                    y.edit(embed).then(() => t++)
                  }
                break;
              }
              if(turns >= 3){
                if(p1 === p2 && p2 === p3) return y.edit(`${winner} ha ganado!`)
                if(p4 === p5 && p5 === p6) return y.edit(`${winner} ha ganado!`)
                if(p7 === p8 && p8 === p9) return y.edit(`${winner} ha ganado!`)
                if(p1 === p4 && p4 === p7) return y.edit(`${winner} ha ganado!`)
                if(p2 === p5 && p5 === p8) return y.edit(`${winner} ha ganado!`)
                if(p3 === p6 && p6 === p9) return y.edit(`${winner} ha ganado!`)
                if(p1 === p5 && p5 === p9) return y.edit(`${winner} ha ganado!`)
                if(p3 === p5 && p5 === p7) return y.edit(`${winner} ha ganado!`)
              }
            })
          })
        }else{
          return
        }
      })
    })
  }
}