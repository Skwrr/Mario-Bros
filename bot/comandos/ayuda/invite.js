module.exports = {
  name: "invite",
  description: "Obten la invitación del bot",
  use: "",
  category: 'ayuda',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js") 
    let btn = new Discord.MessageButton()
    .setLabel("Invite")
    .setStyle("LINK")
    .setURL("https://discord.com/api/oauth2/authorize?client_id=662995691164925973&permissions=8&scope=bot%20applications.commands")
    message.channel.send({content: "Aquí tienes mi invitación", components: [new Discord.MessageActionRow().addComponents(btn)]}).then(m => {
      let filter = (btn) => btn.deferUpdate()
      m.awaitMessageComponent({filter, componentTpye: "BUTTON"})
    })
  }
}