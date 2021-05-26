module.exports = async(client, message, args, Discord) => {
  console.log("Ejecutando play.js...")

  const ytdl = require("ytdl-core")
  const ytSearch = require("yt-search")
  const oppusscript = require("opusscript")

  const voiceChannel = message.member.voice.channel
  if(!voiceChannel) return message.channel.send("Necesitas estar en un comando para usar a este bot")
  if(!args[0]) return message.channel.send("Debes escribir el link de una cancion")
  const permissions = voiceChannel.permissionsFor(message.client.user)
  if(!permissions.has("CONNECT")) return message.channel.send("No tengo permisos para conectarme a ese canal de voz")
  if(!permissions.has("SPEAK")) return message.channel.send("No tengo permisos para hablar en el canal en el que estas intentando reproducir mi musica")

  var connection = await voiceChannel.join()

  const videoFinder = async (query) => {
    const videoResult = await ytSearch(query)

    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;

  }

  const video = await videoFinder(args.join(" "))

  if(video){
    const stream = ytdl(video.url, {filter: 'audioonly'})
    connection.play(stream, {seek: 0, volume: 1})
    .on('finish', () => {
      voiceChannel.leave()
    })

    await message.reply(":+1: Reproduciendo ahora: "+video.title+"\nDuracion: "+video.duration.timestamp)
  }else{
    message.channel.send("No se encontraron videos")
  }
}