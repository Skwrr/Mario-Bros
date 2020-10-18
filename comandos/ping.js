module.exports = (client, message, args) => {
  let ping = Math.floor(message.client.ping);
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