module.exports = {
  name: "servidor",
  description: "Entra a mi servidor de soporte",
  use: "",
  category: 'ayuda',
  alias: [],
  async run(client,message) {
    const {MessageEmbed, MessageButton, MessageActionRow}=require("discord.js")
    let row = new MessageActionRow().addComponents(new MessageButton().setStyle("LINK").setLabel("Estás invitado a mi servidor de soporte").setURL("https://discord.gg/MhKWCTun6w"))
    message.channel.send({content: "** **", components: [row]})
  }
}