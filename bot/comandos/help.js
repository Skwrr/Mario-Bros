module.exports = {
  name: "help",
  description: "Muestra los comandos del bot",
  use: "[commandName/nodm]",
  category: 'ayuda',
  alias: ["comandos", "command", "info", "commands", "ayuda"],
  async run(client, message, args, db) {
    message.channel.send("Este comando es ahora un SlashCommand, puedes volver a invitar al bot si no ves los SlashCommand")
    require("./ayuda/invite").run(client, message)
  },
  SlashCommand: {
    options: [{
      name: "command",
      required: false,
      description: "Muestra la informacion de un comando",
      type: "STRING"
    }],
    async run(client, message, args){
      const Discord = require("discord.js")
      const fs = require("fs")
      const ms = require("ms")
      let db = require("megadb")
      const prefixes = new db.crearDB("prefixes")
      let prefix = await prefixes.get(message.member.guild.id)
      if(!prefix || prefix === undefined) prefixes.set(message.member.guild.id, 'mb.')
      prefix = await prefixes.get(message.member.guild.id)

      const name = message.options.getString("command");
      
      let data = []

      if (!args.getString("command")) {
        
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

        let musicacmd = client.comandos.filter(c => c.category == 'musica').map(e => e.name)

        let nivelescmd = client.comandos.filter(c => c.category == 'niveles').map(e => e.name)

        let personalizadoscmd = client.comandos.filter(c => c.category == 'personalizados').map(e => e.name)

        let utilcmd = client.comandos.filter(c => c.category == 'util').map(e => e.name)

        let totalcmdc = ayudacmd.length+betacmdc.length+betaccmdc.length+contraseñascmd.length+creadorcmd.length+diversioncmd.length+economiacmd.length+moderacioncmd.length+nivelescmd.length+personalizadoscmd.length+utilcmd.length

        data.push('Aquí tienes una lista de todos mis comandos');
        data.push(`Puedes escribir ${prefix}help [commandName] para más información`);
        let premium = client.comandos.filter(c => c.premium == true).map(e => e.name)
        
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
        .addField(`Musica [${musicacmd.length}]`, `\`${musicacmd.join("\` - \`")}\``)
        .addField(`Niveles [${nivelescmd.length}]`, `\`${nivelescmd.join("\` - \`")}\``)
        .addField(`Personalizados [${personalizadoscmd.length}]`, `\`${personalizadoscmd.join("\` - \`")}\``)
        .addField(`Utiles [${utilcmd.length}]`, `\`${utilcmd.join("\` - \`")}\``)
        .addField(`Premiums [${premium.length}]`, `\`${premium.join("\` - \`")}\``)
        .addField(`Comandos Totales`, totalcmdc.toString())
        .setFooter(data[1], client.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setAuthor(message.user.username, message.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setColor("RANDOM")
        .setThumbnail(message.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()

        return message.user.send({embeds: [embed]})
          .then(() => {
      	    if (message.channel.type === 'dm') return;
      	    message.reply('Mira tus MDs');
          })
          .catch(error => {
      	    console.error(`No puedo enviarle un MD a ${message.user.tag}.\n`, error);
      	    message.reply({embeds: [embed]});
          });
      }
      if(args.getString("command") === "nodm"){
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

        let musicacmd = client.comandos.filter(c => c.category == 'musica').map(e => e.name)

        let nivelescmd = client.comandos.filter(c => c.category == 'niveles').map(e => e.name)

        let personalizadoscmd = client.comandos.filter(c => c.category == 'personalizados').map(e => e.name)

        let utilcmd = client.comandos.filter(c => c.category == 'util').map(e => e.name)

        let totalcmdc = ayudacmd.length+betacmdc.length+betaccmdc.length+contraseñascmd.length+creadorcmd.length+diversioncmd.length+economiacmd.length+moderacioncmd.length+nivelescmd.length+personalizadoscmd.length+utilcmd.length
        let premium = client.comandos.filter(c => c.premium == true).map(e => e.name)
        const embed = new Discord.MessageEmbed()
        .setTitle('Aqui tienes una lista de todos mis comandos')
        .addField(`Ayuda [${ayudacmd.length}]`, `\`${ayudacmd.join("\` - \`")}\``)
        .addField(`Beta [${betacmdc.length}]`, `\`${betacmd}\``)
        .addField(`Beta Creador [${betaccmdc.length}]`, `\`${betaccmd}\``)
        .addField(`Contraseñas [${contraseñascmd.length}]`, `\`${contraseñascmd.join("\` - \`")}\``)
        .addField(`Creador [${creadorcmd.length}]`, `\`${creadorcmd.join("\` - \`")}\``)
        .addField(`Diversion [${diversioncmd.length}]`, `\`${diversioncmd.join("\` - \`")}\``)
        .addField(`Economia [${economiacmd.length}]`, `\`${economiacmd.join("\` - \`")}\``)
        .addField(`Moderacion [${moderacioncmd.length}]`, `\`${moderacioncmd.join("\` - \`")}\``)
        .addField(`Musica [${musicacmd.length}]`, `\`${musicacmd.join("\` - \`")}\``)
        .addField(`Niveles [${nivelescmd.length}]`, `\`${nivelescmd.join("\` - \`")}\``)
        .addField(`Personalizados [${personalizadoscmd.length}]`, `\`${personalizadoscmd.join("\` - \`")}\``)
        .addField(`Utiles [${utilcmd.length}]`, `\`${utilcmd.join("\` - \`")}\``)
        .addField(`Premiums [${premium.length}]`, `\`${premium.join("\` - \`")}\``)
        .addField(`Comandos Totales`, totalcmdc.toString())
        .setFooter(data[1], client.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setAuthor(message.user.username, message.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setColor("RANDOM")
        .setThumbnail(message.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setTimestamp()

        return message.reply({embeds: [embed]})
          .then(() => {
      	    if (message.channel.type === 'dm') return;
          })
      }
      const command = client.comandos.get(name) || client.comandos.find(c => c.alias && c.alias.includes(name));
      if (!command) {
        return message.reply(':x: Ese comando no existe :x:');
      }

      const embed = new Discord.MessageEmbed()
      .setFooter("()=Obligatorio []=Opcional", client.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setAuthor(message.user.username, message.user.displayAvatarURL({dynamic: true, size: 1024}))
      .setColor("RANDOM")
      .setThumbnail(message.user.displayAvatarURL())
      .setTimestamp()

      embed.setTitle(`**${command.name}**`)

      function mayuscula(string) {
        string = string.replace(/[^a-z]/gi, '')
        return string[0].toUpperCase()+string.slice(1)
      }
      if (command.alias && command.alias.length >= 1) embed.addField(`**Alias**`, command.alias.join(', '))
      if (command.description) embed.addField(`**Descripción**`, command.description)
      if (!command.SlashCommand) command.use ? embed.addField(`**Uso**`, prefix+command.name+" "+command.use) : ""
      else command.use ? embed.addField(`**Uso**`, "/"+command.name+" "+command.use) : ""
      if (command.category) embed.addField(`**Categoría**`, mayuscula(command.category))
      if (command.premium && command.premium === true) embed.addField(`**Premium?**`, "Sí")
      else embed.addField(`**Premium?**`, "No")
      message.reply({embeds: [embed]});
    }
  }
}