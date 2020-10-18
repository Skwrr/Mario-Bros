module.exports = (client, message, args, Discord) => {
  if (!args[0]) {
    if (message.author.id !== "466241681654808576")
      return message.channel.send(
        "**Solo puede usar este comando mi creador**"
      );
    message.channel.send(
      `${client.users.size} usuarios \n${client.guilds.size} servidores`
    );
  } else if (args[0] === "nombres") {
    const names = client.guilds.map(g => g.name).join("\n");
    if (message.author.id !== "466241681654808576")
      return message.channel.send(
        "**Solo puede usar este comando mi creador**"
      );
    message.channel.send("**Nombre de los servidores:\n" + names + "**");
  } else if (args[0] === "names") {
    const names = client.guilds.map(g => g.name).join("\n");
    if (message.author.id !== "466241681654808576")
      return message.channel.send(
        "**Solo puede usar este comando mi creador**"
      );
    message.channel.send("**Nombre de los servidores:\n" + names + "**");
  } else if (args[0] !== "nombres" && args[0] !== "names") {
    message.reply(
      "No existe ningun argumento como ese, los argumentos que existen son `names` y `nombres`"
    );
  }
};
