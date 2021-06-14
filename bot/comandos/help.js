module.exports = {
  name: "help",
  description: "Muestra los comandos del bot",
  use: "[commandName/nodm]",
  category: 'ayuda',
  alias: ["comandos", "command", "info", "commands", "ayuda"],
  async run(client, message, args, db) {
    const Discord = require("discord.js")
    const fs = require("fs")
    const ms = require("ms")
    const prefixes = new db.crearDB("prefixes")
    let prefix = await prefixes.get(message.guild.id)
    if(!prefix || prefix === undefined) prefixes.set(message.guild.id, 'hp')

    const name = args[0];
    const command = client.comandos.get(name) || client.comandos.find(c => c.alias && c.alias.includes(name));
    
    let data = []

    if (!args.length) {
	    let ayudacmd = client.comandos.filter(c => c.category == 'ayuda').map(e => e.name)

      let betacmd = client.comandos.filter(c => c.category == 'beta').map(e => e.name)
      if(!betacmd || betacmd.size < 1 || betacmd.length < 1) betacmd = 'None'
      if(betacmd && betacmd.size >= 1 && betacmd.length >= 1) betacmd = betacmd.join("\` - \`")

      let betaccmd = client.comandos.filter(c => c.category == 'beta creador').map(e => e.name)
      if(!betaccmd || betaccmd.size < 1 || betaccmd.length < 1) betaccmd = 'None'
      if(betaccmd && betaccmd.size >= 1 && betaccmd.length >= 1) betaccmd = betaccmd.join("\` - \`")

      let betacmdc = client.comandos.filter(c => c.category == 'beta').map(e => e.name)

      let betaccmdc = client.comandos.filter(c => c.category == 'beta creador').map(e => e.name)

      let contraseñascmd = client.comandos.filter(c => c.category == 'contraseñas').map(e => e.name)

      let creadorcmd = client.comandos.filter(c => c.category == 'creador').map(e => e.name)

      let diversioncmd = client.comandos.filter(c => c.category == 'diversion').map(e => e.name)

      let economiacmd = client.comandos.filter(c => c.category == 'economia').map(e => e.name)

      let moderacioncmd = client.comandos.filter(c => c.category == 'moderacion').map(e => e.name)

      let nivelescmd = client.comandos.filter(c => c.category == 'niveles').map(e => e.name)

      let personalizadoscmd = client.comandos.filter(c => c.category == 'personalizados').map(e => e.name)

      let totalcmdc = ayudacmd.length+betacmdc.length+betaccmdc.length+contraseñascmd.length+creadorcmd.length+diversioncmd.length+economiacmd.length+moderacioncmd.length+nivelescmd.length+personalizadoscmd.length
      const embed = new Discord.MessageEmbed()
      .setTitle(data[0])
      .addField(`Ayuda [${ayudacmd.length}]`, `\`${ayudacmd.join("\` - \`")}\``)
      .addField(`Beta [${betacmdc.length}]`, `\`${betacmd}\``)
      .addField(`Beta Creador [${betaccmdc.length}]`, `\`${betaccmd}\``)
      .addField(`Contraseñas [${contraseñascmd.length}]`, `\`${contraseñascmd.join("\` - \`")}\``)
      .addField(`Creador [${creadorcmd.length}]`, `\`${creadorcmd.join("\` - \`")}\``)
      .addField(`Diversion [${diversioncmd.length}]`, `\`${diversioncmd.join("\` - \`")}\``)
      .addField(`Economia [${economiacmd.length}]`, `\`${economiacmd.join("\` - \`")}\``)
      .addField(`Moderacion [${moderacioncmd.length}]`, `\`${moderacioncmd.join("\` - \`")}\``)
      .addField(`Niveles [${nivelescmd.length}]`, `\`${nivelescmd.join("\` - \`")}\``)
      .addField(`Personalizados [${personalizadoscmd.length}]`, `\`${personalizadoscmd.join("\` - \`")}\``)
      .addField(`Comandos Totales`, totalcmdc)
      .setFooter(data[1], client.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
      .setTimestamp()

	    return message.author.send(embed)
		    .then(() => {
			    if (message.channel.type === 'dm') return;
			    message.reply('Mira tus MDs');
		    })
		    .catch(error => {
			    console.error(`No puedo enviarle un MD a ${message.author.tag}.\n`, error);
			    message.reply('No te puedo enviar un MD');
		    });
    }
    if(args[0] === "nodm"){
      data.push('Aquí tienes una lista de todos mis comandos');
	    data.push(`Puedes escribir ${prefix}help [commandName] para más información`);

      let ayudacmd = client.comandos.filter(c => c.category == 'ayuda').map(e => e.name)

      let betacmd = client.comandos.filter(c => c.category == 'beta').map(e => e.name)
      if(!betacmd || betacmd.size < 1 || betacmd.length < 1) betacmd = 'None'
      if(betacmd && betacmd.size >= 1 && betacmd.length >= 1) betacmd = betacmd.join("\` - \`")

      let betaccmd = client.comandos.filter(c => c.category == 'beta creador').map(e => e.name)
      if(!betaccmd || betaccmd.size < 1 || betaccmd.length < 1) betaccmd = 'None'
      if(betaccmd && betaccmd.size >= 1 && betaccmd.length >= 1) betaccmd = betaccmd.join("\` - \`")

      let betacmdc = client.comandos.filter(c => c.category == 'beta').map(e => e.name)

      let betaccmdc = client.comandos.filter(c => c.category == 'beta creador').map(e => e.name)

      let contraseñascmd = client.comandos.filter(c => c.category == 'contraseñas').map(e => e.name)

      let creadorcmd = client.comandos.filter(c => c.category == 'creador').map(e => e.name)

      let diversioncmd = client.comandos.filter(c => c.category == 'diversion').map(e => e.name)

      let economiacmd = client.comandos.filter(c => c.category == 'economia').map(e => e.name)

      let moderacioncmd = client.comandos.filter(c => c.category == 'moderacion').map(e => e.name)

      let nivelescmd = client.comandos.filter(c => c.category == 'niveles').map(e => e.name)

      let personalizadoscmd = client.comandos.filter(c => c.category == 'personalizados').map(e => e.name)

      let totalcmdc = ayudacmd.length+betacmdc.length+betaccmdc.length+contraseñascmd.length+creadorcmd.length+diversioncmd.length+economiacmd.length+moderacioncmd.length+nivelescmd.length+personalizadoscmd.length
      const embed = new Discord.MessageEmbed()
      .setTitle(data[0])
      .addField(`Ayuda [${ayudacmd.length}]`, `\`${ayudacmd.join("\` - \`")}\``)
      .addField(`Beta [${betacmdc.length}]`, `\`${betacmd}\``)
      .addField(`Beta Creador [${betaccmdc.length}]`, `\`${betaccmd}\``)
      .addField(`Contraseñas [${contraseñascmd.length}]`, `\`${contraseñascmd.join("\` - \`")}\``)
      .addField(`Creador [${creadorcmd.length}]`, `\`${creadorcmd.join("\` - \`")}\``)
      .addField(`Diversion [${diversioncmd.length}]`, `\`${diversioncmd.join("\` - \`")}\``)
      .addField(`Economia [${economiacmd.length}]`, `\`${economiacmd.join("\` - \`")}\``)
      .addField(`Moderacion [${moderacioncmd.length}]`, `\`${moderacioncmd.join("\` - \`")}\``)
      .addField(`Niveles [${nivelescmd.length}]`, `\`${nivelescmd.join("\` - \`")}\``)
      .addField(`Personalizados [${personalizadoscmd.length}]`, `\`${personalizadoscmd.join("\` - \`")}\``)
      .addField(`Comandos Totales`, totalcmdc)
      .setFooter(data[1], client.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
      .setTimestamp()

	    return message.channel.send(embed)
		    .then(() => {
			    if (message.channel.type === 'dm') return;
		    })
    }
    if (!command) {
	    return message.reply(':x: Ese comando no existe :x:');
    }

    const embed = new Discord.MessageEmbed()
    .setFooter("()=Obligatorio []=Opcional", client.user.displayAvatarURL({dynamic: true, size: 1024}))
    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp()

    embed.setTitle(`**${command.name}**`)

    if (command.alias && command.alias.length >= 1) embed.addField(`**Alias**`, command.alias.join(', '))
    if (command.description) embed.addField(`**Descripción**`, command.description)
    if (command.use) embed.addField(`**Uso**`, prefix+command.name+" "+command.use)
    if (command.category) embed.addField(`**Categoría**`, command.category.replace())

    message.channel.send(embed);
  }
}