module.exports = {
  name: "servidor",
  description: "Entra a mi servidor de soporte",
  use: "",
  category: 'ayuda',
  alias: [],
  async run(client,message) {
    const {MessageEmbed}=require("discord.js")
    const embed = new MessageEmbed()
    .setDescription("[Estas invitado a mi casa :D](https://discord.gg/MhKWCTun6w)")
    .setColor("RANDOM")
    message.channel.send(embed)
  }
}