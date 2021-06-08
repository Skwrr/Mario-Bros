module.exports = async(client, message, args, Discord) => {
  message.delete()
  let c = args[0]
  if(!c || isNaN(c) || c < 1) return message.reply("Escriba el numero de mensajes a borrar")
  .then(m => {
    m.delete({timeout: 4000})
  })
  message.channel.bulkDelete(c).catch(err => {
    message.channel.send("Ha ocurrido un error, probablemente hay un mensaje con más de 2 semanas de antiguedad")
    .then(m => {
      m.delete({timeout: 4000})
    })
    return true
  })
  message.channel.send(`${c} mensajes eliminados`)
  .then(m => {
    m.delete({timeout: 4000})
  })
}