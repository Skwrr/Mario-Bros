module.exports = async(client, message, args, Discord) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("No puedes ejecutar este comando")
  message.channel.send(`La id del servidor ${message.guild.name} es ${message.guild.id}`)
}