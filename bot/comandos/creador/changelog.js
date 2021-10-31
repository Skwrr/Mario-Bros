module.exports = {
  name: "changelog",
  description: "Actualiza el changelog del servidor",
  use: "(thing updated, description | other thing updated, description || thing deleted, description | other thing deleted, description)",
  perms: {
    owner: process.env.OWNERS_ID
  },
  alias: ["clog", "changes"],
  category: "creador",
  async run(iwannatrysomethingnewandimgonnadothisxd, message, args, _, Discord){
    if(!args[0]) return message.reply("Debes escribir algo para enviar")
    this.client = iwannatrysomethingnewandimgonnadothisxd

    let sep = {
      global: args.join(" ").split(" || "),
      added: {
        big: args.join(" ").split(" || ")[0].split(" | "),
        small: args.join(" ").split(" || ")[0].split(" | ").map(e => e.split(", ").join(": "))
      },
      removed: {
        big: args.join(" ").split(" || ")?.[1]?.split(" | "),
        small: args.join(" ").split(" || ")?.[1]?.split(" | ")?.map(e => e.split(", ").join(": "))
      }
    },
    a = null,
    d = null

    if(!sep.added.small[0]) a = "Nada"
    else a = sep.added.small
    if(!sep.removed.small?.[0]) d = "Nada"
    else d = sep.removed.small

    let channel = await this.client.channels.fetch("899688546066124821")
    let embed = new Discord.MessageEmbed()
    .setTitle("ChangeLog updated")
    .setDescription(`\`\`\`diff\n# Cosas modificadas\n${a != "Nada" ? "+"+a?.join("\n+") : "Nada"}\n${d != "Nada" ? "-"+d.join("\n-") : ""}\n\`\`\`\n`)
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTimestamp()
    channel.send({content: (await this.client.guilds.fetch("876201162192322572")).roles.resolve("877927597047185418").toString(), embeds: [embed]})
    message.reply("Cambios Enviados").then(e => {
      setTimeout(()=>e.delete(),5000)
      message.delete()
    })
  }
}