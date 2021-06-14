module.exports = {
  name: "actualizacion",
  description: "Dá un aviso.",
  use: "(actualizacion)",
  category: 'creador',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  message.delete();
      const staff = process.env.OWNERS_ID
      if (!staff.includes(message.author.id)) return message.channel.send("❌ **Solo mi Creador puede usar Este cmd** ❌")
        return message.channel.send(
          "Este comando solo puede usarlo mi creador"
        );
      let texto = args.slice(0).join(" ");
      if (!texto)
        return message.channel.send("Porfavor escriba la actualización");
      client.channels.get("764147619504062475").send(texto);
  }
}