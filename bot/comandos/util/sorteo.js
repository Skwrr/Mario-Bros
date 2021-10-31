module.exports = {
  name: "sorteo",
  description: "Crea un sorteo",
  category: "util",
  use: "(duration) (winnerCount) (prize)",
  premium: true,
  alias: ["giveaway", "gw"],
  cooldown: 20,
  perms: {
    user: ["MANAGE_CHANNELS"],
  },
  async run(client, message, args){
    const Discord = require("discord.js")
    let channel = message.channel,
    duration = args[0],
    winnerCount = args[1],
    prize = args.slice(2).join(" ").split(" | "),
    req = prize[1],
    ms = require("ms")
    prize = prize[0]

    typeof winnerCount == "integer" ? winnerCount = parseInt(winnerCount) : winnerCount = 1

    if(!channel) return message.reply("Necesitas establecer un canal")
    if(!duration) return message.reply("Debes establecer una duración (10s, 20m, etc)")
    duration = ms(duration)
    if(!winnerCount) return message.reply("Debes establecer el numero de ganadores (1,2,3, etc)")
    if(!prize) return message.reply("Debes establecer un premio")
    client.giveaways.start(channel, {
      duration,
      winnerCount,
      prize,
      hostedBy: message.author
    }).catch(err => {
      message.reply(err)
    })
    if(req) message.channel.send("Requisito: **"+req+"**")
    message.delete()
  }
}