module.exports = {
  name: "ping",
  description: "Obten la latencia de la API y el lag del bot",
  use: "",
  category: 'ayuda',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  let ping = Math.floor(message.client.ws.ping);
    let permiso = message.member.hasPermission("ADMINISTRATOR");
    if (!permiso)
      return message.channel.send("No tienes permisos para usar este comando");

    message.channel.send(":ping_pong: Pong!").then(m => {
      m.edit(
        `:incoming_envelope: Ping Mensajes: \`${Math.floor(
          Date.now() - m.createdTimestamp
        )} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``
      );
    }, 1000);
  }
}