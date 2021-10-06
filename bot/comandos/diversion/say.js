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
    message.channel.send(texto)
		message.delete();
	},
  SlashCommand: {
    options: [{
      name: "texto",
      type: "STRING",
      description: "Texto a decir",
      required: true
    }],
    async run(client, message) {
      let args = message.options
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
        ',io',
      ];
      
      let texto = args.getString("texto")
      // if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      //   if (
      //     texto.toLowerCase().includes(everyone) ||
      //     texto.toLowerCase().includes('@here')
      //   ) {
      //     return message.reply({content: 'No puedes mencionar `@ everyone` ni `@ here`', ephemeral: true});
      //   }
      if(links.some(pass => texto.toLowerCase().includes(pass))) return message.reply({content: "No puedes enviar ningún link", ephemeral: true})
      //   if(texto.mentions.roles.first() || message.guild.roles.cache.some(role => texto.includes(role.id))) return message.reply({content:"No puedes mencionar roles", ephemeral: true})
      // } else {
      //   message.reply(
      //     {content:'Tienes permisos de Manage_Messages, así que, tienes un bypass para los links y el @everyone/@here y roles', ephemeral:true}
      //   )
      // }
      message.reply({content: "Mensaje enviado", ephemeral: true})
      message.channel.send({content: texto, allowedMentions: {parse: ["users"],repliedUser: true}});
    }
  }
}
