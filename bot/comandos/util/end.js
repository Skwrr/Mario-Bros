module.exports = {
  name: "end",
  description: "Termina un sorteo",
  category: "util",
  use: "(giveaway id)",
  premium: true,
  alias: ["gend"],
  cooldown: 20,
  perms: {
    user: ["MANAGE_CHANNELS"],
  },
  async run(client, message, args){
    const Discord = require("discord.js")
    let channel = message.channel,
    gid = args[0]

    if(!gid) return message.reply("Debes establecer la id del sorteo")
    client.giveaways.end(gid).catch(err => {
      message.reply(err)
    })
  }
}