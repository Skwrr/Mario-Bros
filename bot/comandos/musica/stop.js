module.exports = async(client, message, args, Discord) => {
  console.log("Ejecutando stop.js")
  if(!message.member.voice.channel) return message.channel.send("No estas en un canal de voz")
  message.channel.send("Desconectado correctamente de "+ message.member.voice.channel.name)
  message.member.voice.channel.leave()
  return;
}