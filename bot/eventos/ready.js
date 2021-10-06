module.exports = async(client) => {
  let db = require("megadb")
  let { valorationdb: media } = require("../comandos/functions.js")
  client.guildssize = client.guilds.cache.size
  client.userssize = client.users.cache.size
  client.valorations = await media(db)
  client.commandsran = 0
  client.usuarios = client.users
  client.db = require("megadb")
  module.exports.client = client
  client.user.setPresence({
        activities: [{
            name: `mi creador || /help`,
            type: 'STREAMING',
            url: "https://www.youtube.com/watch?v=FDBzKxZntKQ"
        }],
    });
//SlashCommands

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
}