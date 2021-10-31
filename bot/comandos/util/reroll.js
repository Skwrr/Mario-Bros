module.exports = {
  name: "reroll",
  description: "Crea un sorteo",
  category: "util",
  use: "(giveaway id)",
  premium: true,
  alias: ["grr"],
  cooldown: 20,
  perms: {
    user: ["MANAGE_CHANNELS"],
  },
  async run(client, message, args){
    const Discord = require("discord.js")
    let channel = message.channel,
    gid = args[0]

    if(!gid) return message.reply("Debes establecer la id del sorteo")
    client.giveaways.reroll(gid).catch(err => {
      message.reply(err)
    })
  }
}