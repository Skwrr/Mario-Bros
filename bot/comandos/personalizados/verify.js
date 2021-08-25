module.exports = {
  name: "verify",
  description: "Mandale un md a mi creador para solicitar el rango Premium",
  use: "(nick)",
  category: 'personalizados',
  alias: [],
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
      "**Este comando es esclusivo para un servidor, si le gustaria tener su comando exclusivo contacte con mi creador (" +
        process.env.OWNER +
        ")**"
    );
  }
}
}