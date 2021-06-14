module.exports = {
  name: "getpremiumlink",
  description: "Obten el link de mi bot premium",
  use: "",
  category: 'creador',
  alias: ["gpl", "getpremium"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const staff = process.env.OWNERS_ID
  if(!staff.includes(message.author.id)) return message.reply("No puedes usar este comando")
  message.author.send(new Discord.MessageEmbed().setDescription("[NO DISTRIBUYA ESTE ENLACE POR DIVERSIÓN](https://discord.com/api/oauth2/authorize?client_id=823678973174349914&permissions=2750807824&scope=bot%20applications.commands)").setColor("RANDOM"))
  message.reply("Revisa tus MD")
  }
}