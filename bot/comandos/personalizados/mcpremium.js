module.exports = {
  name: "mcpremium",
  description: "Verifica si un usuario es prefmium",
  use: "(nick)",
  category: 'personalizados',
  alias: [],
  Custom: "720657677323075584",
  async run(client, message, args) {
    const Discord = require("discord.js")
  if(message.guild.id !== '720657677323075584') return message.reply("Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` en tu servidor y accede al panel del bot")
  const text = args.join(' ')
  if(!text) return message.channel.send('Envie un nombre de usuario Minecraft.');
   let headURL = `https://cravatar.eu/helmhead/${text}.png`;
 message.channel.send( 'Head del usuario `'+ text+'`:',{files: [headURL]})
 }
}