module.exports = (client, message, args) => {
  message.delete();
      if (message.author.id !== "466241681654808576")
        return message.channel.send(
          "Este comando solo puede usarlo mi creador"
        );
      let texto = args.slice(0).join(" ");
      if (!texto)
        return message.channel.send("Porfavor escriba la actualización");
      client.channels.get("764147619504062475").send(texto.toLowerCase());
}