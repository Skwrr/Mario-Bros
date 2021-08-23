module.exports = {
	name: 'say',
	description: 'Hazme decir algo',
	use: '(texto)',
	category: 'diversion',
	alias: ['decir'],
	async run(client, message, args) {
		const Discord = require('discord.js');
		const everyone = message.guild.roles.cache.find(m => m.name == '@everyone');
		const links = [
			'https://',
			'http://',
			'http',
			'https',
			'discord.gg',
			'https://discord.gg',
			'discord gg',
			'discord,gg',
			'discord, gg',
			'discord. gg',
			'discord . gg',
			'discord .gg',
			'discord, gg',
			'discord , gg',
			'discord ,gg',
			'.com',
			'.es',
			'.org',
			'.net',
			'.io',
			',com',
			',es',
			',org',
			',net',
			',io'
		];
		
		let texto = args.join(' ');
		if (!message.channel.permissionsFor(client.user).has('MANAGE_MESSAGES'))
			return message.reply('No puedo borrar tus mensajes');
		if (!texto) return message.channel.send(`Escriba un contenido para decir.`);
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
			message.delete()
		} else {
			message.author.send(
				'Tienes permisos de Manage_Messages, así que, tienes un bypass para los links y el @everyone/@here y roles'
			);
		}

		message.delete();
		message.channel.send(texto);
	}
}
