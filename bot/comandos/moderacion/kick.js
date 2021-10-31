module.exports = {
  name: "kick",
  description: "Expulsa a algún usuario",
  category: "moderacion",
  perms: {
    user: ["KICK_MEMBERS"],
    bot: ["KICK_MEMBERS"]
  },
  SlashCommand: {
    options: [
      {
        name: "member",
        description: "Mención de un usuario",
        required: true,
        type: "MEMBER"
      },
      {
        name: "reason",
        description: "Razón de expulsión",
        required: false,
        type: "STRING"
      }
    ],
    async run(client, message, args){
      let member = args.getMember("member")
      if(member.roles?.highest.position > message.guild.me.roles?.highest.position) return message.reply({content: "El miembro mencionado tiene roles más altos que los míos", ephemeral: true})
      if(!member.kickable) return message.reply({content: "Ese usuario no se puede kickear", ephemeral: true})
      let reason = args.getString("reason") || "Razón no definida"
      member.send("Hola! Me temo que te han expulsado de "+message.guild.name+" por la razón `"+reason+"`, lo siento!")
      member.kick({reason})
      message.reply("Usuario expulsado")
    }
  }
}