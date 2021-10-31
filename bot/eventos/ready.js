module.exports = async(client) => {
  let db = require("megadb")
  let { valorationdb: media } = require("../comandos/functions.js")
  client.guildssize = client.guilds.cache.size
  client.userssize = client.users.cache.size
  client.valorations = await media(db)
  client.commandsran = 0
  client.usuarios = client.users
  client.db = require("megadb")
  let commandc = new db.crearDB("commands")
  if(!commandc.has("times")) commandc.set("times", 0)
  module.exports.client = client
  client.user.setPresence({
        activities: [{
            name: `mi creador || /help`,
            type: 'STREAMING',
            url: "https://www.youtube.com/watch?v=FDBzKxZntKQ"
        }],
    });
// The Fastest Global SlashCommands

client.comandos.forEach(cmd => {
  if(cmd.SlashCommand && cmd.SlashCommand.run){
    let data = {
      name: cmd.name,
      description: cmd.description,
      options: cmd.SlashCommand.options,
    };
    client.guilds.cache.forEach(guild => client.guilds.cache.get(guild.id).commands.create(data).catch(error => error.message))
    //client.guilds.cache.get("876201162192322572").commands.create(data)
  }
})





//Command Informer
let Discord = require("discord.js"), { MessageButton: mb, MessageActionRow: mr } = require("discord.js")
let embed = new Discord.MessageEmbed()
.setTitle("Comandos")
.setDescription("Reacciona con los botones para desplazarte entre comandos")
.setColor("RANDOM")
.setTimestamp()
.setAuthor(client.user.username, client.user.displayAvatarURL())
let commands = [], buttons = {}
buttons.next = new mb().setStyle("PRIMARY").setEmoji("▶️").setCustomId("next")
buttons.backward = new mb().setStyle("PRIMARY").setEmoji("◀️").setCustomId("backward")
client.comandos.forEach(cmd => commands.push(cmd))
let i = 0
let ch = client.channels.resolve("880543656854036500")
ch.messages.fetch("880612684373041192").then(mens => 
mens.edit({embeds: [embed], components: [new mr().addComponents([buttons.backward, buttons.next])]}).then(m => {
  let filter = async (btn) => {
    btn.deferUpdate()
    let {mayuscula} = require("../comandos/functions")
    let db = require("megadb")
    db = new db.crearDB("prefixes")
    let prefix = await db.get("876201162192322572")
      if(btn.customId === "backward"){
        if (btn.user.bot) return;

      if(i > 0){
        embed = new Discord.MessageEmbed()
        .setColor(embed.color)
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(embed.description)

      i-=1
      let command = commands[i]

      embed.setTitle(command.name)
      if (command.alias && command.alias.length >= 1) embed.addField(`**Alias**`, command.alias.join(', '))
      if (command.description) embed.addField(`**Descripción**`, command.description)
      if (!command.SlashCommand) command.use ? embed.addField(`**Uso**`, prefix+command.name+" "+command.use) : ""
      else command.use ? embed.addField(`**Uso**`, "/"+command.name+" "+command.use) : ""
      if (command.category) embed.addField(`**Categoría**`, mayuscula(command.category))
      if (command.premium && command.premium === true) embed.addField(`**Premium?**`, "Sí")
      else embed.addField(`**Premium?**`, "No")
      if(command.SlashCommand) embed.addField("**SlashCommand?**", "Sí")
      else embed.addField("**SlashCommand?**", "No")
      m.edit({embeds: [embed]})    
      }

      }else if(btn.customId === "next"){
        if (btn.user.bot) return;

      if(i < commands.length-1){
        embed = new Discord.MessageEmbed()
        .setColor(embed.color)
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(embed.description)
      i+=1
      let command = commands[i]

      embed.setTitle(command.name)
      if (command.alias && command.alias.length >= 1) embed.addField(`**Alias**`, command.alias.join(', '))
      if (command.description) embed.addField(`**Descripción**`, command.description)
      if (!command.SlashCommand) command.use ? embed.addField(`**Uso**`, prefix+command.name+" "+command.use) : ""
      else command.use ? embed.addField(`**Uso**`, "/"+command.name+" "+command.use) : ""
      if (command.category) embed.addField(`**Categoría**`, mayuscula(command.category))
      if (command.premium && command.premium === true) embed.addField(`**Premium?**`, "Sí")
      else embed.addField(`**Premium?**`, "No")
      if(command.SlashCommand) embed.addField("**SlashCommand?**", "Sí")
      else embed.addField("**SlashCommand?**", "No")
      m.edit({embeds: [embed]})
      }else if(i >= commands.length) return
      }
}
  m.awaitMessageComponent({filter})
}))


// Server Count
setInterval(async() => {
  let channel1 = await client.channels.fetch("901522176279191663"),
  channel2 = await client.channels.fetch("901522220604620810"),
  channel3 = await client.channels.fetch("901522255178240040"),
  channel4 = await client.channels.fetch("903839732570673202"),
  channel41 = await client.channels.fetch("896422103161643019")
  rstatus = "Down"

  if(await require("roblox-status") == "Active Incident") rstatus = "Down"
  else rstatus = "Working"
    
  channel1.setName("╠Bots: "+channel1.guild.members.cache.filter(e => e.user.bot).size)
  channel2.setName("╠Usuarios: "+channel2.guild.members.cache.filter(e => !e.user.bot).size)
  channel3.setName("╠Miembros: "+channel3.guild.members.cache.size)
  channel4.setName("╚Roblox Status: "+rstatus)
  channel41.setName("Boblox Status: "+rstatus)
}, 2500)

function switchAvatar(client, normal, sleeping){
  let time = new Date().getHours()+2
  console.log(time)
  if(time < 22) {
    if(client.user.displayAvatarURL({format: "png"}) != normal) client.user.setAvatar(normal)
  }else if(time >= 22) {
    if(client.user.displayAvatarURL({format: "png"}) == normal) client.user.setAvatar(sleeping)
  }
}

setInterval(() => {
  switchAvatar(client, "https://cdn.discordapp.com/avatars/662995691164925973/d31c7c6f770d12105fd4a6c2ead27f86.png", "https://cdn.discordapp.com/avatars/662995691164925973/ba749b5610ce1b6b3d550e111190af97.png")
}, 3600000)

}