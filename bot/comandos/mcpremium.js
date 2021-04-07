module.exports = async(client, message, args, Discord) => {
  if(message.guild.id !== '720657677323075584') return message.reply("Este comando solo puede ser ejecutado en el servidor de VineHCF, si quieres un comando personalizado para tu propio servidor, contacta conmigo: "+process.env.OWNER)
  const text = args.join(' ')
  if(!text) return message.channel.send('Envie un nombre de usuario Minecraft.');
   let headURL = `https://cravatar.eu/helmhead/${text}.png`;
 message.channel.send( 'Head del usuario `'+ text+'`:',{files: [headURL]})
 }