module.exports = {
  name: "infoall",
  description: "Obten informacion sobre mis servidores/usuarios",
  use: "",
  category: 'creador',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  if (!args[0]) {
    const staff = process.env.OWNERS_ID
    if (!staff.includes(message.author.id)) return message.channel.send("❌ **Solo mi Creador puede usar Este cmd** ❌")
    message.channel.send(
      `${client.users.cache.size} usuarios \n${client.guilds.cache.size} servidores`
    );
  } else if (args[0] === "nombres") {
    var names = client.guilds.cache.map(g => g.name).join("\n");
    if (message.author.id !== "466241681654808576")
      return message.channel.send(
        "**Solo puede usar este comando mi creador**"
      );
    message.channel.send("**Nombre de los servidores:\n" + names + "**");
  } else if (args[0] === "names") {
    names = client.guilds.cache.map(g => g.name).join("\n");
    if (message.author.id !== "466241681654808576")
      return message.channel.send(
        "**Solo puede usar este comando mi creador**"
      );
    message.channel.send("**Nombre de los servidores:\n" + names + "**");
  }else if (args[0] === "ids") {
    var ids = client.guilds.cache.map(g => g.id).join("\n");
    if (message.author.id !== "466241681654808576")
      return message.channel.send(
        "**Solo puede usar este comando mi creador**"
      );
    message.channel.send("**IDs de los servidores:\n" + ids + "**");
  } else if (args[0] !== "nombres" && args[0] !== "names" && args[0] !== "ids" && args[0] !== "invites") {
    message.reply(
      "No existe ningun argumento como ese, los argumentos que existen son `names`, `nombres`, `ids` e `invites`"
    );
  } else if (args[0] == "invites") {
    let embed = new Discord.MessageEmbed()
    .setDescription(`** **`)
    .setColor("RANDOM")
    message.channel.send(embed).then(g => {
      client.guilds.cache.forEach(async (guild) => {
        const channel = guild.channels.cache.filter(x => x.type === "text").random()//.map(channel => channel.id).join("\n")
        if(!guild) return message.reply("No existe ese servidor")
        if(!guild.me.permissions.has("CREATE_INSTANT_INVITE")) return message.channel.send("No se pudo genererar una invitación para el servidor **"+guild.name+"**")
        let invite = await channel.createInvite({maxAge: 0, maxUses: 1})
        embed = embed
        .addField(`${guild.name}`, `${invite}`)
        .setColor("RANDOM")
        g.edit(embed)
      })
    })
    
  }
  }
}