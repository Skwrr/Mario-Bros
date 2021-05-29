module.exports = async(client, message, args, Discord) => {
  if (!args[0]) {
    if (message.author.id !== "466241681654808576")
      return message.channel.send(
        "**Solo puede usar este comando mi creador**"
      );
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
  } else if (args[0] !== "nombres" && args[0] !== "names" && args[0] !== "ids" && args[0] !== "invite") {
    message.reply(
      "No existe ningun argumento como ese, los argumentos que existen son `names`, `nombres`, `ids` e `invite`"
    );
  } else if (args[0] == "invite") {
    if(!args[1] || isNaN(args[1])) return message.reply("Escriba una id valida")
    let guild
    guild = client.guilds.cache.find(x => x.id == args[1])
    const channel = guild.channels.cache.filter(x => x.type === "text").random()//.map(channel => channel.id).join("\n")
    if(!guild) return message.reply("No existe ese servidor")
    const invite = await channel.createInvite()
    const embed = new Discord.MessageEmbed()
    .setDescription(invite)
    .setColor("RANDOM")
    message.channel.send(embed)
  }
};
