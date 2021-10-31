module.exports = {
  name: "emotes",
  description: "Obten todos los emotes de este servidor",
  use: "",
  category: 'util',
  alias: ["emojis"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  message.delete()

if(message.guild.emojis.cache.size < 1) return message.channel.send('¡Este servidor no tiene emojis!')

let emojis = []
let emojis_a = []

message.guild.emojis.cache.filter(x => !x.animated).map(x => emojis.push(`<:${x.name}:${x.id}>`))

message.guild.emojis.cache.filter(x => x.animated).map(x => emojis_a.push(`<a:${x.name}:${x.id}>`))

message.channel.send({embeds: [{ 
  title: `Emojis de ${message.guild.name}`, 
  color: 'RANDOM', 
  fields: [{ 
    name: 'Emojis estaticos:',
    value: emojis[0] ? emojis.slice(0, 10).join('\n') : 'Este servidor no tiene emojis estaticos'

  },
  {
    name: 'Emojis animados:',
    value: emojis_a[0] ? emojis_a.slice(0, 10).join('\n') : 'Este servidor no tiene emojis animados'

  }],
  author: {
    name: `Pedido por: ${message.author.tag}`,
    icon_url: message.author.displayAvatarURL()
  }
}]}).then(async a => {

  await a.react('◀️')
  await a.react('⏹️')
  await a.react('▶️')

  let i = 0;
  let i2 = 10;
  let filter = (reaction, user) => {
    if(user.id !== message.author.id) return
    
  

      if(reaction.emoji.name === "◀️"){
        if (user.bot) return;
        reaction.users.remove(user.id) 
        a.react("◀️") 

      if(i > 1){

      i-=10
      i2-=10

      a.edit({embeds: [{
        title: `Emojis de ${message.guild.name}`, 
        color: 'RANDOM', 
        fields: [{ 
          name: 'Emojis estaticos:',

          value: emojis[0] ? emojis.slice(i, i2).join('\n') : 'Este servidor no tiene emojis estaticos'
        },
        {
          name: 'Emojis animados:',

          value: emojis_a[0] ? emojis_a.slice(i, i2).join('\n') : 'Este servidor no tiene emojis animados'
        }],
        author: {
          name: `Pedido por: ${message.author.tag}`,
          icon_url: message.author.displayAvatarURL()
        }
      }]})      
      }

      }else if(reaction.emoji.name === "⏹️"){
        if (user.bot) return;
        a.delete() 

      }else if(reaction.emoji.name === "▶️"){
        if (user.bot) return;
        reaction.users.remove(user.id)
        a.react("▶️") 

      if(emojis.slice(i, i2+1)[emojis.slice(i, i2+1).length - 1] !== emojis[emojis.length-1]){

      i+=10
      i2+=10

      a.edit({embeds: [{
        title: `Emojis de ${message.guild.name}`, 
        color: 'RANDOM', 
        fields: [{ 
          name: 'Emojis estaticos:',

          value: emojis[0] ? emojis.slice(i, i2).join('\n') : 'Este servidor no tiene emojis estaticos'
        },
        {
          name: 'Emojis animados:',

          value: emojis_a[0] ? emojis_a.slice(i, i2).join('\n') : 'Este servidor no tiene emojis animados'
        }],
        author: {
          name: `Pedido por: ${message.author.tag}`,
          icon_url: message.author.displayAvatarURL()
        }
      }]})   
      }
      }
}
  a.awaitReactions({filter})
  })
}
}