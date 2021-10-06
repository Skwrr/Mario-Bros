module.exports = {
  name: "verify",
  description: "Mandale un md a mi creador para solicitar el rango Premium",
  use: "(nick)",
  category: 'personalizados',
  alias: [],
  Custom: "720657677323075584",
  async run(client, message, args) {
    const Discord = require("discord.js")
  if (message.guild.id === "720657677323075584") {
    const namemc = args[0]
    if (!namemc) return message.reply("Escribe su nombre de minecraft premium")
    const owner = "466241681654808576"
    client.users.cache.get(owner).send(`${message.author.tag} ha solicitado tener rango verificado en VineHCF con el nombre ${namemc}`);
    message.channel.send("**Ya se envio la solicitud de tener rango Verificado, solo espere a ser respondido**")
  } else {
    message.channel.send(
      "Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` en tu servidor y accede al panel del bot"
    );
  }
}
}