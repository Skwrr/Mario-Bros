module.exports = {
  name: "ghostme",
  description: "Envía un mensaje sin que nadie pueda mandarte un MD ni ver tu información personal",
  use: "(msg)",
  category: "diversion",
  alias: ["ghostsay", "ghostmsg"],
  async run(client, message, args){
    if(!message.guild.me.permissions.has("MANAGE_WEBHOOKS")) return message.reply("No tengo permisos para gestionar WebHooks")
    if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply("No tengo permisos para gestionar mensajes")
      if (!message.member.permissions.has('MANAGE_MESSAGES')) {
			if (
				message.content.toLowerCase().includes(everyone) ||
				message.content.toLowerCase().includes('@here')
			) {
				return message.reply('No puedes mencionar `@ everyone` ni `@ here`');
				message.delete();
			}
			if(links.some(pass => message.content.toLowerCase().includes(pass))) return message.reply("No puedes enviar ningún link")
			if(message.mentions.roles.first() || message.guild.roles.cache.some(role => message.content.includes(role.id))) return message.reply("No puedes mencionar roles")
		} else {
			message.author.send(
				'Tienes permisos de Manage_Messages, así que, tienes un bypass para los links y el @everyone/@here y roles'
			);
		}
    message.delete()
      if(!args[0]) return message.reply("Debes escribir algo para decir").then(y => y.delete({timeout: 2000}))
      let { webhook: wh, sendWebhook: sw } = require("webhookmgr")
      new wh(message, message.author.username, message.author.displayAvatarURL()).then(async webhook => {
        await sw(webhook, args[0], true)
      })
  }
}