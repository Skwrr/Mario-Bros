module.exports = {
  name: "request",
  description: "Habla con mi creador a traves de este comando",
  use: "",
  category: 'ayuda',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
    const sugerencia = args.join(" ")
    if (!sugerencia) return message.reply("Escribe el comando que desee enviar para añadir")
    const owner = "466241681654808576"
    client.users.cache.get(owner).send(`${message.author.tag} ha solicitado añadir el comando: ${sugerencia}`);
    message.channel.send("**Ya se envio la solicitud para añadir el comando**")
  }
}