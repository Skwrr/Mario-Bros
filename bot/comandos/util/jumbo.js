module.exports = {
  name: "jumbo",
  description: "Observa un emoji grande",
  use: "(:emoji:)",
  category: "util",
  alias: [],
  async run(client, message, args){
    let { MessageButton: mb, MessageActionRow: mar } = require("discord.js")
    let {link: isLink} = require("../functions")
    let prefix = require("megadb")
    prefix = new prefix.crearDB("prefixes")
    prefix = prefix.has(message.guild.id) ? await prefix.get(message.guild.id) : "k!"
    if(!args[0]) return message.reply("Debes escribir un emoji, si quieres ver una lista de ellos, usa \`"+prefix+"emojis\` o usa una url para convertir en emoji")
    let row = null
    let link = null
    if(isLink(args[0])){
      link = args[0]
      row = new mar().addComponents(new mb().setStyle("PRIMARY").setLabel("Añadir al servidor").setCustomId("addtoserver"))
    }else{
      const emoji = require("discord.js").Util.parseEmoji(args[0])
      if(emoji.id == null) return message.reply("Ese no es un emoji válido")
      link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`
    }
    message.channel.send({content: link, components: [row]}).then(m => {
      let filter = (btn) => {
        if(btn.user.bot) return
        if(btn.user.id !== message.author.id) return btn.reply({content: "No puedes usar este botón", ephemeral: true})
        btn.deferUpdate()
        row = new mar().addComponents(new mb().setStyle("PRIMARY").setLabel("Añadir al servidor").setCustomId("addtoserver").setDisabled(true))
        m.edit({
          content: m.content,
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
          content: m.content,
          components: [row]
        })
      })
    })
  }
}