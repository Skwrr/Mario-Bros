module.exports = {
  name: "deletec",
  description: "Elimina el canal en el que te encuentras",
  use: "",
  category: 'moderacion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  if (!message.member.permissions.has("MANAGE_CHANNELS") || !process.env.OWNERS_ID.includes(message.author.id)) return message.channel.send("No puedes usar ese comando")
  message.channel.send("Adios :)").then(() => {
    message.channel.delete()
  })
  
}
}