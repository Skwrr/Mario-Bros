module.exports = async(client, message, args, Discord) => {
  let d
  const db = require("megadb")
  const counting = new db.crearDB("counting")
  const already = counting.has(message.guild.id)
  d = await counting.get(`${message.guild.id}.count`)
  let embed = new Discord.MessageEmbed()
  .setTitle("Deseas establecer aquí el canal de `counting`?")
  .setColor("RANDOM");
  message.channel.send(embed).then(m => {
    m.react("674306744423284776")
    m.awaitReactions((reaction, user) => {
      if(user.bot) return
      reaction.users.remove(user.id)
      if(reaction.emoji.name === "encendido"){
        if(!already){
          embed.setTitle("Canal de `counting` establecido correctamente, empiece contando por **0**")
          m.edit(embed)
          counting.set(`${message.guild.id}.channel`, message.channel.id)
          counting.set(`${message.guild.id}.count`, "0")
        }else{
          embed.setTitle("Canal de `counting` establecido correctamente, empiece contando por **"+d+"**")
          m.edit(embed)
          counting.set(`${message.guild.id}.channel`, message.channel.id)
          counting.set(`${message.guild.id}.count`, d)
        }
      }
    })
  })
}