module.exports = {
  name: "jumbo",
  description: "Observa un emoji grande",
  use: "(:emoji:)",
  category: "util",
  alias: [],
  async run(client, message, args){
    let { MessageButton: mb, MessageActionRow: mar } = require("discord.js")
    let prefix = require("megadb")
    prefix = new prefix.crearDB("prefixes")
    prefix = prefix.has(message.guild.id) ? await prefix.get(message.guild.id) : "mb."
    if(!args[0]) return message.reply("Debes escribir un emoji, si quieres ver una lista de ellos, usa \`"+prefix+"emojis\`")
    const emoji = require("discord.js").Util.parseEmoji(args[0])
    if(emoji.id == null) return message.reply("Ese no es un emoji válido")
    let link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`
    let row = new mar().addComponents(new mb().setStyle("PRIMARY").setLabel("Añadir al servidor").setCustomId("addtoserver"))
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
          message.guild.emojis.create(link, emoji.name)
          message.channel.send("Emoji añadido")
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