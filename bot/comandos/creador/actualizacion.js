module.exports = {
  name: "actualizacion",
  description: "Dá un aviso.",
  use: "(actualizacion)",
  perms: {
    owner: process.env.OWNERS_ID
  },
  category: 'creador',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  message.delete();
      let texto = args.slice(0).join(" ");
      if (!texto)
        return message.channel.send("Porfavor escriba la actualización");
      client.channels.cache.get("764147619504062475").send(texto);
  }
}