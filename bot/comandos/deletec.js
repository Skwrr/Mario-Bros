module.exports = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No puedes usar ese comando")
  message.channel.send("Adios :)").then(() => {
    message.channel.delete()
  })
  
}