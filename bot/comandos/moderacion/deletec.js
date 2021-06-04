module.exports = (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("No puedes usar ese comando")
  message.channel.send("Adios :)").then(() => {
    message.channel.delete()
  })
  
}