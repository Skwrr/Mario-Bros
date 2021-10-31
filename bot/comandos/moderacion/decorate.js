module.exports = {
  name: "decorate",
  description: "Decora el servidor (no se puede deshacer)",
  use: "(guild/category)",
  perms: {
    user: ["MANAGE_CHANNELS"],
    bot: ["MANAGE_CHANNELS"]
  },
  category: "moderacion",
  alias: [],
  async run(client, message, args, db, Discord){
    let mode = args[0]
    if(!mode || mode != "guild" && mode != "category"){
      message.reply("Necesitas decir que quieres decorar, `guild` o `category`")
    }else
    if(mode == "guild"){
      message.guild.channels.cache.filter(e => e.type == "GUILD_TEXT").forEach(channel => {
        if(!channel.name.toLowerCase().startsWith("╔〢") &&
        !channel.name.toLowerCase().startsWith("╠〢") &&
        !channel.name.toLowerCase().startsWith("╚〢")){
          if(channel.position == "0") channel.setName("╔〢"+channel.name)
          else
          if(message.guild.channels.cache.find(e => e.position == channel.position+1 && e.type == "GUILD_TEXT" && e.parentId == channel.parentId)) channel.setName("╠〢"+channel.name)
          else channel.setName("╚〢"+channel.name)
        }
      })
    }else
    if(mode == "category"){
      message.guild.channels.cache.filter(e => e.type == "GUILD_TEXT" && e.parentId == message.channel.parentId).forEach(ch => {
        if(!ch.name.toLowerCase().startsWith("╔〢") &&
        !ch.name.toLowerCase().startsWith("╠〢") &&
        !ch.name.toLowerCase().startsWith("╚〢")){
          if(ch.position == "0") ch.setName("╔〢"+ch.name)
          else if(message.guild.channels.cache.find(e => e.position == ch.position+1 && e.type == "GUILD_TEXT" && e.parentId == ch.parentId)) ch.setName("╠〢"+ch.name)
          else ch.setName("╚〢"+ch.name)
        }
      })
      message.reply("Canales Decorados")
    }else message.reply("Ha ocurrido un error, porfavor, vuelva a ejecutar el comando o use el comando `k!bugreport` para reportar este mensaje.")
  }
}