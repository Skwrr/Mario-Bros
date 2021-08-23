module.exports = {
  name: "deletec",
  description: "Elimina el canal en el que te encuentras",
  use: "",
  category: 'moderacion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send("No puedes usar ese comando")
  if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send("No tengo permisos para borrar canales")
  message.channel.send("Adios :)").then(() => {
    message.channel.delete()
  })
  
}
}