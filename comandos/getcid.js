module.exports = (client, message, args, Discord) => {
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("No tienes permiso para ver la id de esta categoria")
  let cid = message.channel.parent
  message.channel.send(`La id de la categoria ${cid.name} es ${cid.id}`)
}