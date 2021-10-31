module.exports = {
  name: "ban",
  description: "Expulsa permanentemente a algún usuario",
  category: "moderacion",
  perms: {
    user: ["BAN_MEMBERS"],
    bot: ["BAN_MEMBERS"]
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
      if(!member.bannable) return message.reply({content: "Ese usuario no se puede expulsar", ephemeral: true})
      let reason = args.getString("reason") || "Razón no definida"
      member.send("Hola! Me temo que te han baneado de "+message.guild.name+" por la razón `"+reason+"`, lo siento!")
      member.ban({reason})
      message.reply("Usuario baneado")
    }
  }
}