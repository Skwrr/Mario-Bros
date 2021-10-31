module.exports = {
  name: "emojify",
  description: "Convierte un link en un emoji",
  use: "(link)",
  category: "util",
  alias: [],
  async run(client, message, args){
    let { MessageButton: mb, MessageActionRow: mar } = require("discord.js")
    let {link: isLink} = require("../functions")
    let prefix = require("megadb")
    prefix = new prefix.crearDB("prefixes")
    prefix = prefix.has(message.guild.id) ? await prefix.get(message.guild.id) : "k!"
    let row = null
    let link = args[0]
    if(message.attachments.first()) link = message.attachments.first().proxyURL
    if(!link) return message.reply("Debes escribir una url para convertir en emoji")
    if(isLink(link) && link.includes("https://") || link.includes("http://")){
      row = new mar().addComponents(new mb().setStyle("PRIMARY").setLabel("Añadir al servidor").setCustomId("addtoserver"))
    }else{
      return message.reply("Eso no es un link")
    }
    message.reply({files: [link], components: [row]}).then(m => {
      let filter = (btn) => {
        if(btn.user.bot) return
        if(btn.user.id !== message.author.id) return btn.reply({content: "No puedes usar este botón", ephemeral: true})
        btn.deferUpdate()
        row = new mar().addComponents(new mb().setStyle("PRIMARY").setLabel("Añadir al servidor").setCustomId("addtoserver").setDisabled(true))
        m.edit({
          components: [row]
        })
        if(btn.customId === "addtoserver"){
          if(!btn.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return message.reply("No tienes permisos para gestionar emojis")
          if(!message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return message.reply("No tengo permisos")
          try{
            message.guild.emojis.create(link, `${Number(message.guild.emojis.cache.size)+1}th_emoji`)
            message.channel.send("Emoji añadido")
          }catch(err){
            m.reply("Ha ocurrido un error, probablemente estas usando algo que no es un .gif, .png o .jpg, compruebe el enlace: "+err.message)
          }
        }
      }
      m.awaitMessageComponent({filter, componentType: "BUTTON", time: 30000, errors:["time"]}).catch(error => {
        m.edit({
          components: [row]
        })
      })
    })
  }
}